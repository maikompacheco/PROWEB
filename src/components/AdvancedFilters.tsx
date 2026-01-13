import React, { useState } from 'react'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import { FilterOptions, DominantFoot, AthleteStatus } from '../types'

interface AdvancedFiltersProps {
    onApplyFilters: (filters: FilterOptions) => void
    onReset: () => void
    isOpen?: boolean
}

export default function AdvancedFilters({
    onApplyFilters,
    onReset,
    isOpen = true
}: AdvancedFiltersProps) {
    const [filters, setFilters] = useState<FilterOptions>({})

    const handleApplyFilters = () => {
        onApplyFilters(filters)
    }

    const handleReset = () => {
        setFilters({})
        onReset()
    }

    if (!isOpen) return null

    return (
        <Card className="border border-blue-600/30 bg-gradient-to-br from-blue-950/20 to-transparent">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-50">🔍 Filtros Avançados</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Category */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium block mb-2">Categoria</label>
                        <select
                            value={filters.category || ''}
                            onChange={e => setFilters({ ...filters, category: e.target.value || undefined })}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-50 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Todas as categorias</option>
                            <option value="Sub 7">Sub 7</option>
                            <option value="Sub 9">Sub 9</option>
                            <option value="Sub 11">Sub 11</option>
                            <option value="Sub 13">Sub 13</option>
                            <option value="Sub 15">Sub 15</option>
                            <option value="Sub 17">Sub 17</option>
                            <option value="Sub 20">Sub 20</option>
                        </select>
                    </div>

                    {/* Position */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium block mb-2">Posição</label>
                        <select
                            value={filters.position || ''}
                            onChange={e => setFilters({ ...filters, position: e.target.value || undefined })}
                            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-50 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Todas as posições</option>
                            <option value="Goleiro">Goleiro</option>
                            <option value="Defesa">Defesa</option>
                            <option value="Lateral">Lateral</option>
                            <option value="Volante">Volante</option>
                            <option value="Meia">Meia</option>
                            <option value="Ala">Ala</option>
                            <option value="Atacante">Atacante</option>
                        </select>
                    </div>

                    {/* Dominant Foot */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium block mb-2">Pé Dominante</label>
                        <select
                            value={filters.dominantFoot || ''}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    dominantFoot: (e.target.value as DominantFoot) || undefined
                                })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-50 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Todos</option>
                            <option value={DominantFoot.LEFT}>Esquerdo</option>
                            <option value={DominantFoot.RIGHT}>Direito</option>
                            <option value={DominantFoot.BOTH}>Ambidestro</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium block mb-2">Status</label>
                        <select
                            value={filters.status || ''}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    status: (e.target.value as AthleteStatus) || undefined
                                })
                            }
                            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-50 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Todos os status</option>
                            <option value={AthleteStatus.ACTIVE}>Ativo</option>
                            <option value={AthleteStatus.OBSERVATION}>Observação</option>
                            <option value={AthleteStatus.HIGHLIGHTED}>Destaque</option>
                        </select>
                    </div>

                    {/* Age Range */}
                    <div className="sm:col-span-1">
                        <label className="text-xs text-slate-400 font-medium block mb-2">Idade (Min)</label>
                        <Input
                            type="number"
                            min="0"
                            max="25"
                            value={filters.age?.min || ''}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    age: { ...filters.age, min: parseInt(e.target.value) || 0 }
                                })
                            }
                            placeholder="Mínima"
                        />
                    </div>

                    <div className="sm:col-span-1">
                        <label className="text-xs text-slate-400 font-medium block mb-2">Idade (Máx)</label>
                        <Input
                            type="number"
                            min="0"
                            max="25"
                            value={filters.age?.max || ''}
                            onChange={e =>
                                setFilters({
                                    ...filters,
                                    age: { ...filters.age, max: parseInt(e.target.value) || 25 }
                                })
                            }
                            placeholder="Máxima"
                        />
                    </div>

                    {/* Minimum Attendance */}
                    <div>
                        <label className="text-xs text-slate-400 font-medium block mb-2">Assiduidade Mín. (%)</label>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            value={filters.minAttendance || ''}
                            onChange={e => setFilters({ ...filters, minAttendance: parseInt(e.target.value) || 0 })}
                            placeholder="Mínima %"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-700">
                    <Button variant="outline" onClick={handleReset} className="px-4">
                        Limpar Filtros
                    </Button>
                    <Button variant="primary" onClick={handleApplyFilters} className="px-6">
                        Aplicar Filtros
                    </Button>
                </div>
            </div>
        </Card>
    )
}
