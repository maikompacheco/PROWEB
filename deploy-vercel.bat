@echo off
echo ========================================
echo   BaseONE Sports - Deploy para Vercel
echo ========================================
echo.

echo [1/4] Parando servidor de desenvolvimento...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Instalando Vercel CLI (se necessário)...
call npm install -g vercel

echo [3/4] Fazendo build de producao...
call npm run build

echo [4/4] Iniciando deploy...
echo.
echo IMPORTANTE: 
echo - Faca login com sua conta GitHub/Google quando solicitado
echo - Confirme o nome do projeto (sugestao: baseone-sports)
echo - Aceite as configuracoes padrao
echo.
call vercel --prod

echo.
echo ========================================
echo   Deploy concluido!
echo ========================================
echo.
echo Seu link estara disponivel em alguns segundos.
echo.
pause
