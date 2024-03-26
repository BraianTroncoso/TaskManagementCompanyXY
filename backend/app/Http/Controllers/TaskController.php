<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        // Obtener todas las tareas
        try {
        $tasks = Task::all();
        return response()->json($tasks);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['error' => 'Tareas no encontrada'], 404);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error interno del servidor'], 500);
    }
    }

    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'status' => 'required|in:Pendiente,En proceso,Bloqueado,Completado',
            'assigned_user_id' => 'nullable|exists:users,id'
        ]);

        // Crear la nueva tarea
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'assigned_user_id' => $request->assigned_user_id
        ]);

        return response()->json($task, 201);
    }

    public function show($id)
    {
        try {
            $task = Task::findOrFail($id);
            return response()->json($task);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Tarea no encontrada'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error interno del servidor'], 500);
        }
    }
    

    public function update(Request $request, $id)
    {
        // Obtener la tarea por ID
        $task = Task::findOrFail($id);

        // Validar los datos de entrada
        $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'status' => 'required|in:Pendiente,En proceso,Bloqueado,Completado',
            'assigned_user_id' => 'nullable|exists:users,id'
        ]);

        // Actualizar la tarea
        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'assigned_user_id' => $request->assigned_user_id
        ]);

        return response()->json($task);
    }

    public function destroy($id)
    {
        // Obtener la tarea por ID y eliminarla
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Tarea eliminada correctamente']);
    }
}
