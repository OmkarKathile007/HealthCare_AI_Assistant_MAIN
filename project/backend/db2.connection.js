

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ibmdb from 'ibm_db';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const dbConfig = {
  database: 'bludb',
  hostname: '824dfd4d-99de-440d-9991-629c01b3832d.bs2io90l08kqb1od8lcg.databases.appdomain.cloud',
  port: 30119,
  protocol: 'TCPIP',
  uid: 'tmj22698',
  pwd: '4ybhSbBzLtbGtKN6',
};

// Connection String
const connectionString = `DATABASE=${dbConfig.database};HOSTNAME=${dbConfig.hostname};PORT=${dbConfig.port};PROTOCOL=${dbConfig.protocol};UID=${dbConfig.uid};PWD=${dbConfig.pwd};SECURITY=SSL;`;

// API Endpoint to Insert Patient Data
app.post('/api/patient', async (req, res) => {
  const { patientName, age, gender, contactNumber, address, diagnosisDate, diagnosis, treatment, notes } = req.body;

  try {
    const conn = await ibmdb.open(connectionString);
    console.log('Connected to IBM Db2 for data insertion.');

    const insertQuery = `
      INSERT INTO PatientMedicalHistory 
      (PatientName, Age, Gender, ContactNumber, Address, DiagnosisDate, Diagnosis, Treatment, Notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await conn.prepare(insertQuery).then((stmt) => stmt.executeSync([
      patientName, age, gender, contactNumber, address, diagnosisDate, diagnosis, treatment, notes,
    ]));

    console.log('Patient record inserted successfully!');
    await conn.close();

    res.status(200).json({ message: 'Patient record inserted successfully!' });
  } catch (error) {
    console.error('Error inserting patient record:', error.message);
    res.status(500).json({ error: 'Failed to insert patient record.' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
