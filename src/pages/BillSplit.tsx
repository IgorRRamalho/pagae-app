import React, { useState } from 'react';
import { Calculator, UserPlus, Trash } from 'lucide-react';

interface ResultadosDivisao {
  total: number;
  porPessoa: string;
  participantes: number;
}

export default function DivisaoContas() {
  const [participantes, setParticipantes] = useState<string[]>(['']);
  const [valorTotal, setValorTotal] = useState<string>('');
  const [resultados, setResultados] = useState<ResultadosDivisao | null>(null);

  const calcularDivisao = () => {
    const valor = parseFloat(valorTotal);
    if (!valor || participantes.length === 0) return;

    const porPessoa = valor / participantes.length;
    setResultados({
      total: valor,
      porPessoa: porPessoa.toFixed(2),
      participantes: participantes.length
    });
  };

  return (
    <div className="min-h-screen px-6 ">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 bg-gradient-to-r from-[#6ECCAF] to-[#4A90E2] bg-clip-text text-transparent">
          Divisão de Contas 🧮
        </h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border-4 border-[#9B5DE5]/20">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="dark:text-white font-medium">Valor Total 💰</span>
                <input
                  type="number"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
                  className="mt-1 block w-full p-3 rounded-xl border-2 border-[#9B5DE5]/20 dark:bg-gray-700 dark:text-white"
                  placeholder="Digite o valor total"
                />
              </label>

              <div className="space-y-3">
                {participantes.map((participante, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={participante}
                      onChange={(e) => {
                        const novosParticipantes = [...participantes];
                        novosParticipantes[index] = e.target.value;
                        setParticipantes(novosParticipantes);
                      }}
                      className="flex-1 p-3 rounded-xl border-2 border-[#9B5DE5]/20 dark:bg-gray-700 dark:text-white"
                      placeholder={`Participante ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const novosParticipantes = participantes.filter((_, i) => i !== index);
                        setParticipantes(novosParticipantes);
                      }}
                      className="p-3 text-[#FF6B6B] hover:bg-[#FF6B6B]/10 rounded-xl"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setParticipantes([...participantes, ''])}
                  className="w-full py-2 text-[#6ECCAF] hover:text-[#4A90E2] transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Adicionar Participante
                </button>
              </div>
            </div>

            <button
              onClick={calcularDivisao}
              className="w-full bg-gradient-to-r from-[#6ECCAF] to-[#4A90E2] text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calcular Divisão
            </button>

            {resultados && (
              <div className="mt-6 p-4 bg-[#6ECCAF]/10 dark:bg-gray-700 rounded-xl animate-fade-in">
                <h3 className="text-xl font-bold dark:text-white mb-2">Resultado 🎉</h3>
                <p className="dark:text-gray-300">
                  Total: R$ {resultados.total.toFixed(2).replace('.', ',')}<br/>
                  {resultados.participantes} participantes<br/>
                  Valor por pessoa: <strong>R$ {resultados.porPessoa.replace('.', ',')}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}