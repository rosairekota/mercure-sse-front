'use client'
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Assure-toi que l'URL est correcte

export default function Home() {
  const [patientData, setPatientData] = useState<any>([]);
  const  socket = useSocket('http://localhost:4500');

  useEffect(() => {
    console.log('init');

    // Gestion de la déconnexion
    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
     
    });
    socket.on('patient_created', (data) => {
     // console.log('Mise à jour patient:', data);  // Affiche l'événement dans la console
      setPatientData((prev:any)=>[...prev, data]);  // Met à jour l'interface utilisateur avec les données du patient
    })

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur WebSocket');
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socket.off('patientUpdate');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []); // Ce code ne s'exécute qu'une fois au montage

  return (
    <div>
      <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard de l'Hôpital B</h1>
            {patientData.length > 0 ? (
                patientData.map((patient:any, index:number) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <p className="text-lg font-semibold">Patient ID: {patient?.id}</p>
                        <p className="text-gray-700">{patient?.name}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Pas de transfert de patient en cours.</p>
            )}
        </div>
    </div>
  );
}
