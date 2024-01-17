const {
  writeBatch,
  doc,
  collection,
  getDocs,
  where,
  limit,
  query,
} = require("firebase/firestore")
const { initializeApp, getApp, getApps } = require("firebase/app")
const { getFirestore } = require("firebase/firestore")

async function initFirebase() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  const db = getFirestore(app)
  return { app, db }
}

async function isEmptyCollection(db, collectionName) {
  const docs = await getDocs(collection(db, collectionName))
  if (docs.docs.length > 0) {
    console.log(`[Error] La collection ${collectionName} n'est pas vide`)
    return false
  }
  return true
}

async function isEmptyCompanies(db) {
  const queryCompanies = query(
    collection(db, "users"),
    where("role", "==", "company"),
  )
  const docs = await getDocs(queryCompanies)
  if (docs.docs.length > 0) {
    console.log(`[Error] La collection companies n'est pas vide`)
    return false
  }
  return true
}

async function seedCustomers(db) {
  if (!(await isEmptyCollection(db, "users"))) {
    return
  }
  const batch = writeBatch(db)
  const customers = [
    {
      id: "1",
      name: "Dupont",
      firstName: "Pierre",
      email: "pierre.dupont@example.com",
      phoneNumber: "0612345678",
      role: "customer",
    },
    {
      id: "2",
      name: "Martin",
      firstName: "Sophie",
      email: "sophie.martin@example.com",
      phoneNumber: "0623456789",
      role: "customer",
    },
    {
      id: "3",
      name: "Lefevre",
      firstName: "Jeanne",
      email: "jeanne.lefevre@example.com",
      phoneNumber: "0634567890",
      role: "customer",
    },
    {
      id: "4",
      name: "Moreau",
      firstName: "Louis",
      email: "louis.moreau@example.com",
      phoneNumber: "0645678901",
      role: "customer",
    },
    {
      id: "5",
      name: "Leroy",
      firstName: "Camille",
      email: "camille.leroy@example.com",
      phoneNumber: "0656789012",
      role: "customer",
    },
    {
      id: "6",
      name: "Dubois",
      firstName: "Émilie",
      email: "emilie.dubois@example.com",
      phoneNumber: "0667890123",
      role: "customer",
    },
    {
      id: "7",
      name: "Roux",
      firstName: "Antoine",
      email: "antoine.roux@example.com",
      phoneNumber: "0678901234",
      role: "customer",
    },
    {
      id: "8",
      name: "Garnier",
      firstName: "Marie",
      email: "marie.garnier@example.com",
      phoneNumber: "0689012345",
      role: "customer",
    },
    {
      id: "9",
      name: "Chevalier",
      firstName: "Paul",
      email: "paul.chevalier@example.com",
      phoneNumber: "0690123456",
      role: "customer",
    },
    {
      id: "10",
      name: "Fournier",
      firstName: "Laura",
      email: "laura.fournier@example.com",
      phoneNumber: "0601234567",
      role: "customer",
    },
  ]
  Promise.all(
    customers.map((customer) => {
      const docRef = doc(collection(db, "users"))
      batch.set(docRef, { ...customer, id: docRef.id })
    }),
  )
  await batch.commit()
  console.log("Seeding Customers completed!")
}

async function seedCompanies(db) {
  if (!(await isEmptyCompanies(db))) {
    return
  }
  const batch = writeBatch(db)
  const rentalAgencies = [
    {
      id: "1",
      name: "Dupuis",
      firstName: "Philippe",
      email: "philippe.dupuis@example.com",
      phoneNumber: "0123456789",
      role: "company",
      city: "Paris",
      street: "Rue de la Location",
      postalCode: "75001",
      companyName: "Agence Parisienne de Location - Dupuis",
    },
    {
      id: "2",
      name: "Leclerc",
      firstName: "Isabelle",
      email: "isabelle.leclerc@example.com",
      phoneNumber: "0456789012",
      role: "company",
      city: "Nice",
      street: "Avenue des Voitures",
      postalCode: "06000",
      companyName: "Location Auto Nice - Leclerc",
    },
    {
      id: "3",
      name: "Girard",
      firstName: "Luc",
      email: "luc.girard@example.com",
      phoneNumber: "0467890123",
      role: "company",
      city: "Lyon",
      street: "Boulevard de la Location",
      postalCode: "69001",
      companyName: "Location Girard Lyon Express",
    },
    {
      id: "4",
      name: "Marchand",
      firstName: "Marie",
      email: "marie.marchand@example.com",
      phoneNumber: "0478901234",
      role: "company",
      city: "Marseille",
      street: "Rue des Autos",
      postalCode: "13001",
      companyName: "Agence de Location Marchand - Sud",
    },
    {
      id: "5",
      name: "Rousseau",
      firstName: "Camille",
      email: "camille.rousseau@example.com",
      phoneNumber: "0590123456",
      role: "company",
      city: "Toulouse",
      street: "Avenue de la Location",
      postalCode: "31000",
      companyName: "Location Rousseau Véhicules Toulouse",
    },
    {
      id: "6",
      name: "Bertrand",
      firstName: "Émilie",
      email: "emilie.bertrand@example.com",
      phoneNumber: "0501234567",
      role: "company",
      city: "Bordeaux",
      street: "Rue des Voitures",
      postalCode: "33000",
      companyName: "Location Auto Bordeaux - Bertrand",
    },
    {
      id: "7",
      name: "Lemoine",
      firstName: "Antoine",
      email: "antoine.lemoine@example.com",
      phoneNumber: "0323456789",
      role: "company",
      city: "Strasbourg",
      street: "Boulevard de la Location",
      postalCode: "67000",
      companyName: "Agence Strasbourg de Location - Lemoine",
    },
    {
      id: "8",
      name: "Michel",
      firstName: "Marie",
      email: "marie.michel@example.com",
      phoneNumber: "0234567890",
      role: "company",
      city: "Nantes",
      street: "Avenue des Autos",
      postalCode: "44000",
      companyName: "Location Michel Voiture Nantes",
    },
    {
      id: "9",
      name: "Perrin",
      firstName: "Paul",
      email: "paul.perrin@example.com",
      phoneNumber: "0345678901",
      role: "company",
      city: "Lille",
      street: "Rue de la Location",
      postalCode: "59000",
      companyName: "Agence de Location Lille Nord - Perrin",
    },
    {
      id: "10",
      name: "Fischer",
      firstName: "Laura",
      email: "laura.fischer@example.com",
      phoneNumber: "0456789012",
      role: "company",
      city: "Lyon",
      street: "Avenue de la Location",
      postalCode: "69000",
      companyName: "Location Fischer Véhicules Lyon Sud",
    },
  ]
  Promise.all(
    rentalAgencies.map((agency) => {
      const docRef = doc(collection(db, "users"))
      batch.set(docRef, { ...agency, id: docRef.id })
    }),
  )
  await batch.commit()
  console.log("Seeding Rental Agencies completed!")
}

async function seedCars(db) {
  if (!(await isEmptyCollection(db, "cars"))) {
    return
  }
  const batch = writeBatch(db)
  const queryAgencies = query(
    collection(db, "users"),
    where("role", "==", "company"),
  )
  const agencies = await getDocs(queryAgencies)
  const agency1Ref = agencies.docs[0].ref
  const agency2Ref = agencies.docs[1].ref
  const city1 = agencies.docs[0].data().city
  const city2 = agencies.docs[1].data().city
  const vehicles = [
    {
      id: "1",
      companyId: "1",
      brand: "Renault",
      model: "Clio",
      car_year: 2022,
      dayPrice: 50,
      weekPrice: 300,
      weekEndPrice: 120,
      horsePower: 90,
      fuelType: "Essence",
      rentDeposit: 500,
      kilometerAllowed: 150,
      engineType: "Manuel",
      description: "Compacte et économique",
      options: ["Climatisation", "Bluetooth", "Radar de recul"],
      images: ["image1.jpg", "image2.jpg", "image3.jpg"],
      siege: 5,
    },
    {
      id: "2",
      companyId: "2",
      brand: "Peugeot",
      model: "208",
      car_year: 2021,
      dayPrice: 45,
      weekPrice: 280,
      weekEndPrice: 110,
      horsePower: 80,
      fuelType: "Diesel",
      rentDeposit: 450,
      kilometerAllowed: 160,
      engineType: "Automatique",
      description: "Élégante et confortable",
      options: ["Climatisation", "GPS", "Sièges chauffants"],
      images: ["image4.jpg", "image5.jpg", "image6.jpg"],
      siege: 5,
    },
    {
      id: "3",
      companyId: "3",
      brand: "Citroën",
      model: "C3",
      car_year: 2020,
      dayPrice: 55,
      weekPrice: 320,
      weekEndPrice: 130,
      horsePower: 95,
      fuelType: "Essence",
      rentDeposit: 550,
      kilometerAllowed: 140,
      engineType: "Manuel",
      description: "Style moderne et polyvalent",
      options: ["Climatisation", "Caméra de recul", "Toit panoramique"],
      images: ["image7.jpg", "image8.jpg", "image9.jpg"],
      siege: 5,
    },
    {
      id: "4",
      companyId: "4",
      brand: "Ford",
      model: "Fiesta",
      car_year: 2022,
      dayPrice: 48,
      weekPrice: 290,
      weekEndPrice: 115,
      horsePower: 85,
      fuelType: "Essence",
      rentDeposit: 480,
      kilometerAllowed: 155,
      engineType: "Automatique",
      description: "Compacte et agile",
      options: ["Climatisation", "Bluetooth", "Radar de stationnement"],
      images: ["image10.jpg", "image11.jpg", "image12.jpg"],
      siege: 5,
    },
    {
      id: "5",
      companyId: "5",
      brand: "Volkswagen",
      model: "Golf",
      car_year: 2021,
      dayPrice: 60,
      weekPrice: 350,
      weekEndPrice: 140,
      horsePower: 110,
      fuelType: "Diesel",
      rentDeposit: 600,
      kilometerAllowed: 170,
      engineType: "Manuel",
      description: "Confortable et spacieuse",
      options: ["Climatisation", "GPS", "Toit ouvrant"],
      images: ["image13.jpg", "image14.jpg", "image15.jpg"],
      siege: 5,
    },
    {
      id: "6",
      companyId: "6",
      brand: "Toyota",
      model: "Yaris",
      car_year: 2020,
      dayPrice: 52,
      weekPrice: 310,
      weekEndPrice: 125,
      horsePower: 95,
      fuelType: "Essence",
      rentDeposit: 520,
      kilometerAllowed: 145,
      engineType: "Automatique",
      description: "Fiabilité et économie de carburant",
      options: ["Climatisation", "Bluetooth", "Radar de recul"],
      images: ["image16.jpg", "image17.jpg", "image18.jpg"],
      siege: 5,
    },
    {
      id: "7",
      companyId: "7",
      brand: "Renault",
      model: "Megane",
      car_year: 2022,
      dayPrice: 65,
      weekPrice: 380,
      weekEndPrice: 150,
      horsePower: 120,
      fuelType: "Diesel",
      rentDeposit: 650,
      kilometerAllowed: 180,
      engineType: "Manuel",
      description: "Élégance et performance",
      options: ["Climatisation", "GPS", "Caméra de recul"],
      images: ["image19.jpg", "image20.jpg", "image21.jpg"],
      siege: 5,
    },
    {
      id: "8",
      companyId: "8",
      brand: "Peugeot",
      model: "3008",
      car_year: 2021,
      dayPrice: 70,
      weekPrice: 400,
      weekEndPrice: 160,
      horsePower: 130,
      fuelType: "Essence",
      rentDeposit: 700,
      kilometerAllowed: 190,
      engineType: "Automatique",
      description: "SUV compact et moderne",
      options: ["Climatisation", "Toit panoramique", "Radar de stationnement"],
      images: ["image22.jpg", "image23.jpg", "image24.jpg"],
      siege: 5,
    },
    {
      id: "9",
      companyId: "9",
      brand: "Ford",
      model: "Focus",
      car_year: 2020,
      dayPrice: 58,
      weekPrice: 340,
      weekEndPrice: 135,
      horsePower: 100,
      fuelType: "Diesel",
      rentDeposit: 580,
      kilometerAllowed: 165,
      engineType: "Manuel",
      description: "Performante et élégante",
      options: ["Climatisation", "Bluetooth", "GPS"],
      images: ["image25.jpg", "image26.jpg", "image27.jpg"],
      siege: 5,
    },
    {
      id: "10",
      companyId: "10",
      brand: "Audi",
      model: "A3",
      car_year: 2022,
      dayPrice: 75,
      weekPrice: 420,
      weekEndPrice: 170,
      horsePower: 140,
      fuelType: "Essence",
      rentDeposit: 750,
      kilometerAllowed: 200,
      engineType: "Automatique",
      description: "Luxe et performances",
      options: ["Climatisation", "GPS", "Sièges chauffants"],
      images: ["image28.jpg", "image29.jpg", "image30.jpg"],
      siege: 5,
    },
  ]
  Promise.all(
    vehicles.map((car) => {
      const docRef = doc(collection(db, "cars"))
      batch.set(docRef, {
        ...car,
        id: docRef.id,
        companyId: agency1Ref,
        city: city1,
      })
    }),
    vehicles.map((car) => {
      const docRef = doc(collection(db, "cars"))
      batch.set(docRef, {
        ...car,
        id: docRef.id,
        companyId: agency2Ref,
        city: city2,
      })
    }),
  )
  await batch.commit()

  console.log(
    "Seeding Cars completed!",
    "Cars linked to the agencies: ",
    agency1Ref.id,
    agency2Ref.id,
  )
}

async function seedOrders(db) {
  if (!(await isEmptyCollection(db, "orders"))) {
    return
  }
  const batch = writeBatch(db)
  const orders = [
    {
      id: "1",
      customerId: "1",
      carId: "1",
      companyId: "1",
      rentStartDate: "2024-02-01",
      rentEndDate: "2024-02-05",
      orderPrice: 250,
      paymentStatus: "paid",
      rentStatus: "active",
      created_at: "2024-01-25",
      brand: "Renault",
      model: "Clio",
      customerName: "Dupont",
      customerFirstName: "Pierre",
    },
    {
      id: "2",
      customerId: "2",
      carId: "3",
      companyId: "2",
      rentStartDate: "2024-03-10",
      rentEndDate: "2024-03-15",
      orderPrice: 320,
      paymentStatus: "pending",
      rentStatus: "reserved",
      created_at: "2024-02-25",
      brand: "Citroën",
      model: "C3",
      customerName: "Leclerc",
      customerFirstName: "Isabelle",
    },
    {
      id: "3",
      customerId: "3",
      carId: "5",
      companyId: "3",
      rentStartDate: "2024-04-20",
      rentEndDate: "2024-04-25",
      orderPrice: 370,
      paymentStatus: "paid",
      rentStatus: "active",
      created_at: "2024-04-15",
      brand: "Volkswagen",
      model: "Golf",
      customerName: "Girard",
      customerFirstName: "Luc",
    },
    {
      id: "4",
      customerId: "4",
      carId: "7",
      companyId: "4",
      rentStartDate: "2024-05-05",
      rentEndDate: "2024-05-10",
      orderPrice: 420,
      paymentStatus: "pending",
      rentStatus: "reserved",
      created_at: "2024-04-30",
      brand: "Renault",
      model: "Megane",
      customerName: "Marchand",
      customerFirstName: "Marie",
    },
    {
      id: "5",
      customerId: "5",
      carId: "9",
      companyId: "5",
      rentStartDate: "2024-06-15",
      rentEndDate: "2024-06-20",
      orderPrice: 470,
      paymentStatus: "paid",
      rentStatus: "active",
      created_at: "2024-06-10",
      brand: "Toyota",
      model: "Yaris",
      customerName: "Rousseau",
      customerFirstName: "Camille",
    },
    {
      id: "6",
      customerId: "6",
      carId: "11",
      companyId: "6",
      rentStartDate: "2024-07-25",
      rentEndDate: "2024-07-30",
      orderPrice: 520,
      paymentStatus: "pending",
      rentStatus: "reserved",
      created_at: "2024-07-20",
      brand: "Ford",
      model: "Focus",
      customerName: "Bertrand",
      customerFirstName: "Émilie",
    },
    {
      id: "7",
      customerId: "7",
      carId: "13",
      companyId: "7",
      rentStartDate: "2024-08-05",
      rentEndDate: "2024-08-10",
      orderPrice: 570,
      paymentStatus: "paid",
      rentStatus: "active",
      created_at: "2024-07-30",
      brand: "Peugeot",
      model: "3008",
      customerName: "Lemoine",
      customerFirstName: "Antoine",
    },
    {
      id: "8",
      customerId: "8",
      carId: "15",
      companyId: "8",
      rentStartDate: "2024-09-15",
      rentEndDate: "2024-09-20",
      orderPrice: 620,
      paymentStatus: "pending",
      rentStatus: "reserved",
      created_at: "2024-09-10",
      brand: "Ford",
      model: "Fiesta",
      customerName: "Michel",
      customerFirstName: "Marie",
    },
    {
      id: "9",
      customerId: "9",
      carId: "17",
      companyId: "9",
      rentStartDate: "2024-10-25",
      rentEndDate: "2024-10-30",
      orderPrice: 670,
      paymentStatus: "paid",
      rentStatus: "active",
      created_at: "2024-10-20",
      brand: "Audi",
      model: "A3",
      customerName: "Perrin",
      customerFirstName: "Paul",
    },
    {
      id: "10",
      customerId: "10",
      carId: "19",
      companyId: "10",
      rentStartDate: "2024-11-05",
      rentEndDate: "2024-11-10",
      orderPrice: 720,
      paymentStatus: "pending",
      rentStatus: "reserved",
      created_at: "2024-10-30",
      brand: "Peugeot",
      model: "208",
      customerName: "Fischer",
      customerFirstName: "Laura",
    },
  ]
  await Promise.all(
    orders.map(async (order, index) => {
      const docRef = doc(collection(db, "orders"))
      const queryCustomers = query(
        collection(db, "users"),
        where("role", "==", "customer"),
      )
      const customersDocs = await getDocs(queryCustomers)
      const customers = customersDocs.docs.map((doc) => ({
        ...doc.data(),
        ref: doc.ref,
      }))
      const queryCars = query(collection(db, "cars"), limit(10))
      const carsDoc = await getDocs(queryCars)
      const cars = carsDoc.docs.map((doc) => ({ ...doc.data(), ref: doc.ref }))
      batch.set(docRef, {
        ...order,
        id: docRef.id,
        customerId: customers[index].ref,
        carId: cars[index].ref,
        companyId: cars[index].companyId,
        customerName: customers[index].name,
        customerFirstName: customers[index].firstName,
      })
    }),
  )
  await batch.commit()
  console.log("Seeding orders with success!")
}

async function main() {
  const { db } = await initFirebase()
  await seedCustomers(db)
  await seedCompanies(db)
  await seedCars(db)
  await seedOrders(db)
  process.exit()
}

main().catch((err) => {
  console.error("An error occurred while attempting to seed the database:", err)
})
