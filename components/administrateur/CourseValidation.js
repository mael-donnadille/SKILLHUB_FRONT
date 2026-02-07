"use client";
import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Clock, AlertCircle, Trash2 } from 'lucide-react';

export default function CourseValidation() {
    const [pendingCourses, setPendingCourses] = useState([
        { id: 101, title: 'Introduction à React', trainer: 'Paul Durand', category: 'Développement Web', submittedDate: '2023-10-25', status: 'En attente' },
        { id: 102, title: 'UX Design Avancé', trainer: 'Sophie Leroy', category: 'Design', submittedDate: '2023-10-26', status: 'Modifié' },
        { id: 103, title: 'Marketing Digital 101', trainer: 'Marc Levy', category: 'Marketing', submittedDate: '2023-10-27', status: 'Suppression' },
    ]);

    const handleValidate = (course) => {
        setPendingCourses(pendingCourses.filter(c => c.id !== course.id));
        if (course.status === 'Suppression') {
            alert(`Suppression de la formation "${course.title}" validée.`);
        } else {
            alert(`Formation "${course.title}" validée et publiée !`);
        }
    };

    const handleReject = (course) => {
        setPendingCourses(pendingCourses.filter(c => c.id !== course.id));
        alert(`Action sur la formation "${course.title}" rejetée.`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-primary">Validation des Formations</h1>
                <p className="text-secondary mt-2">Examinez et validez les contenus soumis par les formateurs.</p>
            </div>

            <div className="grid gap-6">
                {pendingCourses.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-primary">Tout est à jour !</h3>
                        <p className="text-secondary">Aucune formation en attente de validation.</p>
                    </div>
                ) : (
                    pendingCourses.map((course) => (
                        <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                                    {course.status === 'Modifié' && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                            <AlertCircle size={12} className="mr-1"/> Modifié
                                        </span>
                                    )}
                                    {course.status === 'En attente' && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                            <Clock size={12} className="mr-1"/> Nouveau
                                        </span>
                                    )}
                                    {course.status === 'Suppression' && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                            <Trash2 size={12} className="mr-1"/> Suppression demandée
                                        </span>
                                    )}
                                </div>
                                <p className="text-secondary text-sm">Proposé par <span className="font-medium text-primary">{course.trainer}</span> • {course.category}</p>
                                <p className="text-xs text-slate-400">Soumis le {course.submittedDate}</p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-primary font-medium rounded-xl hover:bg-slate-50 transition-colors">
                                    <Eye size={18} />
                                    <span>Voir</span>
                                </button>
                                <button
                                    onClick={() => handleReject(course)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 bg-red-50 font-medium rounded-xl hover:bg-red-100 transition-colors"
                                >
                                    <XCircle size={18} />
                                    <span>Rejeter</span>
                                </button>
                                <button
                                    onClick={() => handleValidate(course)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    <CheckCircle size={18} />
                                    <span>
                                        {course.status === 'Suppression' ? 'Confirmer suppression' : 'Valider'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
