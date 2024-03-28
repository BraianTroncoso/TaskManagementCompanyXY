<?php

namespace App\Jobs;

use App\Models\Task;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $startDate = now()->subDays(7); 
        $endDate = now(); 

        $tasks = Task::whereBetween('created_at', [$startDate, $endDate])->get();

        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);

        $dompdf = new Dompdf($options);

        $html = '<h1>Reporte de Tareas Realizadas</h1>';
        foreach ($tasks as $task) {
            $html .= '<h2>Título de la Tarea: ' . $task->title . '</h2>';
            $html .= '<p>Descripción: ' . $task->description . '</p>';
            $html .= '<p>Estado: ' . $task->status . '</p>';
            $html .= '<p>Empleado Asignado: ' . $task->assigned_employee . '</p>';
        }

        $dompdf->loadHtml($html);

        $dompdf->render();

        $outputPath = public_path('reporte.pdf');
        file_put_contents($outputPath, $dompdf->output());
    }
}
