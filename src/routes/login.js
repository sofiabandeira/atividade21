const express = require('express');
const router = express.Router();
const { verificarAutenticacao } = require('../middleware/autenticacao'); // Certifique-se de que o caminho está correto

router.get("/auth", verificarAutenticacao, async (req, res) => {
  console.log("Rota GET /auth solicitada");
  try {
    res.status(200).json({ user: req.userId });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

module.exports = router;