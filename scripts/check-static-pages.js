#!/usr/bin/env node

/**
 * 檢查哪些文章頁面是預生成的（靜態），哪些是動態的
 * 用法：node scripts/check-static-pages.js
 */

const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '../.next/server/app/blog');

if (!fs.existsSync(nextDir)) {
  console.log('❌ .next 資料夾不存在，請先執行 npm run build');
  process.exit(1);
}

const items = fs.readdirSync(nextDir);
const staticPages = [];
const dynamicRoutes = [];

items.forEach(item => {
  if (item === '[slug]') {
    dynamicRoutes.push(item);
  } else {
    staticPages.push(item);
  }
});

console.log('\n📊 Next.js 頁面生成狀態\n');
console.log(`✅ 預生成的靜態頁面（Build 時生成）: ${staticPages.length} 個`);
console.log(`   這些頁面會立即從 CDN 加載\n`);

if (staticPages.length > 0 && staticPages.length <= 20) {
  staticPages.slice(0, 20).forEach(page => {
    console.log(`   • /blog/${page}`);
  });
  if (staticPages.length > 20) {
    console.log(`   ... 及其他 ${staticPages.length - 20} 個`);
  }
} else if (staticPages.length > 20) {
  staticPages.slice(0, 10).forEach(page => {
    console.log(`   • /blog/${page}`);
  });
  console.log(`   ...\n   • /blog/${staticPages[staticPages.length - 1]}`);
  console.log(`   ... 共 ${staticPages.length} 個頁面`);
}

console.log(`\n⚡ 動態路由（按需生成）: ${dynamicRoutes.length} 個`);
dynamicRoutes.forEach(route => {
  console.log(`   • /blog/${route}  ← 首次訪問時動態生成`);
});

console.log(`\n📝 總結：`);
console.log(`   • 快速訪問（<100ms）：前 ${staticPages.length} 篇文章`);
console.log(`   • 動態生成（1-2秒）：第 ${staticPages.length + 1} 篇之後的文章`);
console.log(`   • 重新驗證間隔：每 3600 秒 (1 小時)\n`);
