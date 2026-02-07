"use client";
import { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';

export default function YearManagement() {
    const [years, setYears] = useState([
        { id: 1, label: 'B1 - Bachelor 1ère année' },
        { id: 2, label: 'B2 - Bachelor 2ème année' },
        { id: 3, label: 'B3 - Bachelor 3ème année' },
        { id: 4, label: 'M1 - Mastère 1ère année' },
        { id: 5, label: 'M2 - Mastère 2ème année' },
    ]);
    const [newYear, setNewYear] = useState('');

    const handleAddYear = (e) => {
        e.preventDefault();
        if (!newYear.trim()) return;
        setYears([...years, { id: Date.now(), label: newYear }]);
        setNewYear('');
    };

    const handleDelete = (id) => {
        setYears(years.filter(y => y.id !== id));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-primary">Années de Formation</h1>
                <p className="text-secondary mt-2">Gérez les niveaux d&apos;études disponibles.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <form onSubmit={handleAddYear} className="flex gap-4">
                        <input
                            type="text"
                            value={newYear}
                            onChange={(e) => setNewYear(e.target.value)}
                            className="grow px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Nouvelle année (ex: MBA Spécialisé)"
                        />
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors shadow-md"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Ajouter</span>
                        </button>
                    </form>
                </div>

                <ul className="divide-y divide-slate-100">
                    {years.map((year) => (
                        <li key={year.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-secondary h-5 w-5" />
                                <span className="font-medium text-primary">{year.label}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(year.id)}
                                className="p-2 text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                            >
                                <Trash2 size={18} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
