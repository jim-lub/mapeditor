export const canvasController = {
  update: ({ canvasRef }) => {
    if (!canvasRef || !canvasRef.current) return; // early return if canvas ref is not found or set yet

    const ctx = canvasRef.current.getContext('2d');
    ctx.fillRect(10, 10, 10, 10);
  }
}
