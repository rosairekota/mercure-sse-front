'use client'
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Assure-toi que l'URL est correcte

export default function Home() {
  const [patientData, setPatientData] = useState<any>(null);
  const  socket = useSocket('http://localhost:4500');

  useEffect(() => {
    console.log('init');

    // Gestion de la déconnexion
    socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
     
    });
    socket.on('patient_created', (data) => {
     // console.log('Mise à jour patient:', data);  // Affiche l'événement dans la console
      setPatientData(data);  // Met à jour l'interface utilisateur avec les données du patient
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
      <h1>Dashboard de l'Hôpital B</h1>
      {patientData ? (
        <div>
          <p>Patient ID: {patientData?.patientId}</p>
          <p>{patientData?.name}</p>
        </div>
      ) : (
        <p>Pas de transfert de patient en cours.</p>
      )}
    </div>
  );
}
