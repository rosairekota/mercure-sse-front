'use client'
import React, { useEffect, useState } from 'react'

export default function Patients() {
    const [patientData, setPatientData] = useState<any[]>([]);

    useEffect(() => {
        const eventSource = new EventSource(
            'http://localhost:1337/.well-known/mercure?topic=patient/add&topic=patient/transfer'
           
        );
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPatientData((prev) => [...prev, data]);
        }
        return () => {
            eventSource.close();
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard de l'Hôpital B avec mercure</h1>
            {patientData.length > 0 ? (
                patientData.map((patient, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <p className="text-lg font-semibold">Patient ID: {patient?.id}</p>
                        <p className="text-gray-700">{patient?.name}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Pas de transfert de patient en cours.</p>
            )}
        </div>
    )
}
