import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'user@user.com',
      name: 'Tony Stark',
      password: '1234', // Plain text password for simplicity
      invoices: {
        create: [
          {
            vendor_name: 'Vendor A',
            amount: 100.50,
            due_date: new Date('2024-01-01'),
            description: 'Invoice for services',
            paid: false,
          },
          {
            vendor_name: 'Vendor B',
            amount: 200.75,
            due_date: new Date('2024-02-01'),
            description: 'Invoice for products',
            paid: false,
          },
          {
            vendor_name: 'Vendor C',
            amount: 500.75,
            due_date: new Date('2024-02-01'),
            description: 'I am Ironman',
            paid: false,
          },
          {
            vendor_name: 'Vendor D',
            amount: 200.75,
            due_date: new Date('2024-05-01'),
            description: 'Peace in our time',
            paid: true,
          },
        ],
      },
    },
  });

  console.log('Seeding complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });