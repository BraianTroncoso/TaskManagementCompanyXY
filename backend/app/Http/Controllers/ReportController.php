<?php
namespace App\Http\Controllers;

use App\Jobs\GenerateReport;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function generatePDF(Request $request)
    {
        // Despachar el Job para generar el PDF
        GenerateReport::dispatch();

        // Devolver una respuesta indicando que la solicitud se ha procesado correctamente
        return response()->json(['message' => 'Generación de PDF en proceso'], 200);
    }
}
