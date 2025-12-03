const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all patients with search, sort, filter, pagination
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { 
      search = '', 
      sortBy = 'name', 
      sortOrder = 'asc',
      status = 'all',
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {},
        status !== 'all' ? { status } : {}
      ]
    };

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.patient.count({ where })
    ]);

    res.json({
      patients,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// GET single patient
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id }
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch patient' });
  }
});

// POST create new patient
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, age, gender, phone, email, address, status } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const patient = await prisma.patient.create({
      data: {
        name,
        age: age ? parseInt(age) : null,
        gender,
        phone,
        email,
        address,
        status: status || 'Active'
      }
    });

    res.status(201).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

// PUT update patient
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, age, gender, phone, email, address, status } = req.body;

    const patient = await prisma.patient.update({
      where: { id: req.params.id },
      data: {
        name,
        age: age ? parseInt(age) : null,
        gender,
        phone,
        email,
        address,
        status
      }
    });

    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});

// DELETE patient
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.patient.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

module.exports = router;
