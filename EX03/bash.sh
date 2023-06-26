#!/bin/bash
chmod +x bash.sh

origem="origem"
destino="destino"

if [ ! -d "$destino" ]; then
  echo "Diretório '$destino' não existe. Criando..."
  mkdir ./$destino
fi

echo "Copiando arquivos..."
cp ./$origem/*.txt ./$destino

echo "Arquivos .txt copiados com sucesso"