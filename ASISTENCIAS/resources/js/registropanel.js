function togglePanel(panelId) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        if (panel.id === panelId) {
            panel.classList.toggle('hidden');
        } else {
            panel.classList.add('hidden');
        }
    });
}

document.getElementById('togglePanel').addEventListener('click', () => togglePanel('registroPanel'));
document.getElementById('toggleMaterias').addEventListener('click', () => togglePanel('materiasPanel'));
document.getElementById('toggleAsistencias').addEventListener('click', () => togglePanel('asistenciasPanel'));
document.getElementById('toggleNotas').addEventListener('click', () => togglePanel('notasPanel'));
