const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET summary report
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = startDate && endDate ? {
      date: {
        gte: startDate,
        lte: endDate
      }
    } : {};

    const [
      totalPatients,
      activePatients,
      totalAppointments,
      completedAppointments,
      totalBills,
      paidBills,
      totalRevenue,
      pendingRevenue
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.patient.count({ where: { status: 'Active' } }),
      prisma.appointment.count(dateFilter.date ? { where: dateFilter } : {}),
      prisma.appointment.count({ where: { status: 'Confirmed', ...dateFilter } }),
      prisma.bill.count(dateFilter.date ? { where: dateFilter } : {}),
      prisma.bill.count({ where: { status: 'Paid', ...dateFilter } }),
      prisma.bill.aggregate({
        where: { status: 'Paid', ...dateFilter },
        _sum: { amount: true }
      }),
      prisma.bill.aggregate({
        where: { status: 'Pending', ...dateFilter },
        _sum: { amount: true }
      })
    ]);

    res.json({
      patients: {
        total: totalPatients,
        active: activePatients
      },
      appointments: {
        total: totalAppointments,
        completed: completedAppointments
      },
      billing: {
        totalBills,
        paidBills,
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingRevenue: pendingRevenue._sum.amount || 0
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

module.exports = router;
