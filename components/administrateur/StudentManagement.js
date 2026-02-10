"use client";
import { useState } from 'react';
import { Plus, Mail, Trash2, Edit2, Search } from 'lucide-react';

export default function StudentManagement() {
    const [students, setStudents] = useState([
        { id: 1, firstName: 'Alice', lastName: 'Dupont', email: 'alice.dupont@skillhub.com', year: 'B3 Développement', status: 'Actif' },
        { id: 2, firstName: 'Jean', lastName: 'Martin', email: 'jean.martin@skillhub.com', year: 'M1 Data', status: 'Actif' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', email: '', year: '' });

    const handleAddStudent = (e) => {
        e.preventDefault();
        // Simulation of ID generation and email sending
        const student = {
            id: students.length + 1,
            ...newStudent,
            status: 'Actif' // In reality, maybe 'Pending' until they log in
        };
        setStudents([...students, student]);
        setIsModalOpen(false);
        setNewStudent({ firstName: '', lastName: '', email: '', year: '' });
        alert(`Compte créé pour ${student.firstName} ${student.lastName}. Un email avec les identifiants a été envoyé.`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Gestion des Apprenants</h1>
                    <p className="text-secondary mt-2">Créez et gérez les comptes étudiants.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-all shadow-md"
                >
                    <Plus size={20} />
                    <span>Nouvel Apprenant</span>
                </button>
            </div>

            {/* Search/Filter Bar could go here */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-primary">Nom complet</th>
                            <th className="px-6 py-4 text-sm font-semibold text-primary">Email</th>
                            <th className="px-6 py-4 text-sm font-semibold text-primary">Année</th>
                            <th className="px-6 py-4 text-sm font-semibold text-primary">Statut</th>
                            <th className="px-6 py-4 text-sm font-semibold text-primary text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-primary">{student.firstName} {student.lastName}</td>
                                <td className="px-6 py-4 text-secondary">{student.email}</td>
                                <td className="px-6 py-4 text-secondary">{student.year}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {student.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="p-2 text-secondary hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={18} />
                                    </button>
                                    <button className="p-2 text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-2xl font-bold text-primary mb-6">Créer un compte apprenant</h2>
                        <form onSubmit={handleAddStudent} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Prénom</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={newStudent.firstName}
                                    onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Nom</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={newStudent.lastName}
                                    onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={newStudent.email}
                                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Année</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                                    value={newStudent.year}
                                    onChange={(e) => setNewStudent({...newStudent, year: e.target.value})}
                                >
                                    <option value="">Sélectionner une année</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="B3">B3</option>
                                    <option value="M1">M1</option>
                                    <option value="M2">M2</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-secondary font-medium hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors"
                                >
                                    Créer et envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
