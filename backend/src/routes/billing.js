const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all bills with filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { 
      search = '', 
      status = 'all',
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
          patientName: { contains: search, mode: 'insensitive' }
        } : {},
        status !== 'all' ? { status } : {}
      ]
    };

    const [bills, total] = await Promise.all([
      prisma.bill.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder }
      }),
      prisma.bill.count({ where })
    ]);

    res.json({
      bills,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
});

// POST create bill
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { patientName, services, amount, date, paymentMethod } = req.body;

    if (!patientName || !services || !amount || !date) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const bill = await prisma.bill.create({
      data: {
        patientName,
        services,
        amount: parseFloat(amount),
        date,
        status: 'Pending',
        paymentMethod: paymentMethod || 'Cash'
      }
    });

    res.status(201).json(bill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create bill' });
  }
});

// PUT update bill
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { patientName, services, amount, date, status, paymentMethod } = req.body;

    const bill = await prisma.bill.update({
      where: { id: req.params.id },
      data: {
        patientName,
        services,
        amount: amount ? parseFloat(amount) : undefined,
        date,
        status,
        paymentMethod
      }
    });

    res.json(bill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update bill' });
  }
});

// DELETE bill
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.bill.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete bill' });
  }
});

module.exports = router;
