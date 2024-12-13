<?php
require_once 'conexion.php';

const NOTA_MIN = 0;
const NOTA_MAX = 10;

$database = new Database();
$db = $database->connect();

try {
    $parcial1 = $_POST['parcial1'] ?? [];
    $parcial2 = $_POST['parcial2'] ?? [];
    $final = $_POST['final'] ?? [];

    if (empty($parcial1) && empty($parcial2) && empty($final)) {
        throw new Exception('Faltan datos de notas.');
    }

    $db->beginTransaction();

    $alumnos = array_unique(array_merge(array_keys($parcial1), array_keys($parcial2), array_keys($final)));

    foreach ($alumnos as $id_alumno) {
        $notaParcial1 = $parcial1[$id_alumno] ?? null;
        $notaParcial2 = $parcial2[$id_alumno] ?? null;
        $notaFinal = $final[$id_alumno] ?? null;

        if (($notaParcial1 !== null && ($notaParcial1 < NOTA_MIN || $notaParcial1 > NOTA_MAX)) ||
            ($notaParcial2 !== null && ($notaParcial2 < NOTA_MIN || $notaParcial2 > NOTA_MAX)) ||
            ($notaFinal !== null && ($notaFinal < NOTA_MIN || $notaFinal > NOTA_MAX))) {
            throw new Exception("Error: Las notas del alumno con ID $id_alumno deben estar entre " . NOTA_MIN . " y " . NOTA_MAX . ".");
        }

        $stmtCheckNota = $db->prepare("SELECT id_nota, parcial1, parcial2, final FROM nota INNER JOIN alumno_nota ON nota.id = alumno_nota.id_nota WHERE id_alumno = :id_alumno");
        $stmtCheckNota->execute([':id_alumno' => $id_alumno]);
        $existingNote = $stmtCheckNota->fetch();

        if ($existingNote) {
            $id_nota = $existingNote['id_nota'];
            $notaParcial1 = $notaParcial1 !== null ? $notaParcial1 : $existingNote['parcial1'];
            $notaParcial2 = $notaParcial2 !== null ? $notaParcial2 : $existingNote['parcial2'];
            $notaFinal = $notaFinal !== null ? $notaFinal : $existingNote['final'];

            $stmtUpdate = $db->prepare("
                UPDATE nota SET 
                    parcial1 = :parcial1, 
                    parcial2 = :parcial2, 
                    final = :final 
                WHERE id = :id_nota
            ");
            $stmtUpdate->execute([
                ':parcial1' => $notaParcial1,
                ':parcial2' => $notaParcial2,
                ':final' => $notaFinal,
                ':id_nota' => $id_nota
            ]);
        } else {
            $stmtInsert = $db->prepare("INSERT INTO nota (parcial1, parcial2, final) VALUES (:parcial1, :parcial2, :final)");
            $stmtInsert->execute([
                ':parcial1' => $notaParcial1 ?? 0,
                ':parcial2' => $notaParcial2 ?? 0,
                ':final' => $notaFinal ?? 0
            ]);

            $id_nota = $db->lastInsertId();
            $stmtInsertRelation = $db->prepare("INSERT INTO alumno_nota (id_alumno, id_nota) VALUES (:id_alumno, :id_nota)");
            $stmtInsertRelation->execute([
                ':id_alumno' => $id_alumno,
                ':id_nota' => $id_nota
            ]);
        }
    }

    $db->commit();
    echo json_encode(['success' => 'Notas guardadas correctamente.']);
} catch (Exception $e) {
    $db->rollBack();
    echo json_encode(['error' => 'Error al guardar notas: ' . $e->getMessage()]);
}
?>

