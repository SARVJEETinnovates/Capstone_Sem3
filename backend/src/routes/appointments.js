const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all appointments with filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { 
      search = '', 
      status = 'all',
      date = '',
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      AND: [
        search ? {
          OR: [
            { patientName: { contains: search, mode: 'insensitive' } },
            { doctorName: { contains: search, mode: 'insensitive' } }
          ]
        } : {},
        status !== 'all' ? { status } : {},
        date ? { date } : {}
      ]
    };

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.appointment.count({ where })
    ]);

    res.json({
      appointments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST create appointment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { patientName, doctorName, date, time, type, notes } = req.body;

    if (!patientName || !doctorName || !date || !time) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientName,
        doctorName,
        date,
        time,
        type: type || 'Checkup',
        status: 'Pending',
        notes
      }
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// PUT update appointment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { patientName, doctorName, date, time, type, status, notes } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { patientName, doctorName, date, time, type, status, notes }
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE appointment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.appointment.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router;
