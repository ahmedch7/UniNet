// schedule.js
import cron from 'node-cron';
import Salle from '../models/salle.js';

export const releaseExpiredExams = async () => {
  try {
    const now = new Date();

    // Récupérer toutes les salles
    const salles = await Salle.find();

    salles.forEach(async salle => {
      console.log(`Checking salle: ${salle.name}`);
      
      // Filtrer les examens expirés
      const expiredExams = salle.schedules.filter(exam => {
        const examDate = new Date(exam.date);
        const examEndTime = new Date(`${exam.date}T${exam.heureFin}`);

        console.log(`Exam: ${exam.module}, Date: ${examDate}, End Time: ${examEndTime}`);
        console.log(`Current Time: ${now}`);

        return examDate < now && examEndTime < now;
      });

      console.log("Expired exams:", expiredExams);

      if (expiredExams.length > 0) {
        // Supprimer les examens expirés
        salle.schedules = salle.schedules.filter(exam => !expiredExams.includes(exam));
        await salle.save();
        console.log('Expired exams cleared');
      }
    });
  } catch (e) {
    console.error('Error while clearing expired exams:', e);
  }
};

// Configurer la tâche cron pour s'exécuter toutes les heures
cron.schedule('0 * * * *', releaseExpiredExams);

console.log('Cron job for clearing expired exams has been scheduled');
