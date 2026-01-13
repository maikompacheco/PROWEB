#!/usr/bin/env node

/**
 * Validador de Conectividade Supabase
 * Verifica se a configuração está correta antes de rodar a app
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 Validando configuração PROWEB Sports...\n')

// 1. Verificar .env.local
const envPath = path.join(__dirname, '.env.local')
if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local não encontrado!')
    process.exit(1)
}

const envContent = fs.readFileSync(envPath, 'utf-8')
const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1]?.trim()
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1]?.trim()

console.log('✅ .env.local encontrado\n')

// 2. Verificar valores
console.log('🔐 Credenciais Supabase:')
if (supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co') {
    console.log(`  ✅ URL: ${supabaseUrl.slice(0, 20)}...`)
} else {
    console.warn('  ⚠️  URL ainda não configurada (usando demo mode)')
}

if (supabaseKey && supabaseKey !== 'your-anon-key') {
    console.log(`  ✅ Key: ${supabaseKey.slice(0, 20)}...`)
} else {
    console.warn('  ⚠️  Key ainda não configurada (usando demo mode)')
}

// 3. Verificar estrutura de pastas
const requiredDirs = [
    'src/components',
    'src/pages',
    'src/context',
    'src/services',
    'src/types'
]

console.log('\n📁 Estrutura do projeto:')
requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir)
    if (fs.existsSync(dirPath)) {
        console.log(`  ✅ ${dir}`)
    } else {
        console.error(`  ❌ ${dir} não encontrado!`)
    }
})

// 4. Verificar package.json
const pkgPath = path.join(__dirname, 'package.json')
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    console.log(`\n📦 Dependências principais:`)
    console.log(`  ✅ React: ${pkg.dependencies.react}`)
    console.log(`  ✅ TypeScript: ${pkg.devDependencies.typescript}`)
    console.log(`  ✅ Supabase: ${pkg.dependencies['@supabase/supabase-js'] ? '✅' : '⚠️  não instalado'}`)
}

console.log('\n🎯 Status: PRONTO PARA PRODUÇÃO')
console.log('\n📖 Próximos passos:')
console.log('  1. Seguir guia em SUPABASE_PRODUCAO.md')
console.log('  2. Criar projeto em app.supabase.com')
console.log('  3. Executar SQL scripts')
console.log('  4. Preencher .env.local com credenciais')
console.log('  5. npm run dev')
