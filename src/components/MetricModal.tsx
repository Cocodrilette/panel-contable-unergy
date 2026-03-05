import { Table as TableIcon, X } from "lucide-react";
import React from "react";
import type { MetricDetail } from "@/types/sheets";

interface MetricModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  detail: MetricDetail | null;
}

export default function MetricModal({
  isOpen,
  onClose,
  title,
  detail,
}: MetricModalProps) {
  if (!isOpen || !detail) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity cursor-default w-full h-full border-none"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-zinc-800/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                {title}
              </h3>
              <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mt-1">
                Trazabilidad de Datos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="p-0 max-h-[60vh] overflow-y-auto">
          {detail.sourceRows.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-sm">
              No hay filas asociadas a este cálculo.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-200/50 dark:border-zinc-800/50">
                <tr>
                  <th className="px-8 py-4 uppercase">Proyecto</th>
                  <th className="px-8 py-4 uppercase">Concepto</th>
                  <th className="px-8 py-4 text-right uppercase">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/30 dark:divide-zinc-800/30 text-xs">
                {detail.sourceRows.map((row, idx) => (
                  <tr
                    key={`${row.proyecto}-${row.concepto}-${idx}`}
                    className="hover:bg-blue-500/5 transition-colors"
                  >
                    <td className="px-8 py-4 font-medium text-zinc-500 dark:text-zinc-400">
                      {row.proyecto}
                    </td>
                    <td className="px-8 py-4 font-bold text-zinc-900 dark:text-zinc-50">
                      {row.concepto}
                    </td>
                    <td className="px-8 py-4 text-right font-black text-blue-600 dark:text-blue-400">
                      $
                      {(row.valor ?? 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-8 py-5 border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-800/20 flex justify-between items-center">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Total calculado:
          </span>
          <span className="text-xl font-black text-zinc-900 dark:text-zinc-50">
            $
            {(detail.value ?? 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
