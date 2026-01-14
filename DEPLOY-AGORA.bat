@echo off
color 0A
title BaseONE Sports - Deploy Automatico

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         BaseONE SPORTS - Deploy para Producao             ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo.

echo [PASSO 1] Fazendo login na Vercel...
echo.
echo ⚠️  IMPORTANTE: Uma janela do navegador vai abrir
echo     Faca login com GitHub ou Google
echo.
pause

vercel login

echo.
echo [PASSO 2] Iniciando deploy...
echo.

vercel --prod --yes

echo.
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    DEPLOY CONCLUIDO! 🎉                    ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo Seu link de producao foi gerado!
echo Copie o link acima e compartilhe com seus usuarios.
echo.
echo Proximos passos:
echo   1. Teste o link no navegador
echo   2. Compartilhe com sua equipe
echo   3. Configure dominio customizado (opcional)
echo.
echo Pressione qualquer tecla para abrir o painel da Vercel...
pause >nul
start https://vercel.com/dashboard
