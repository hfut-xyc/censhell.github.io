# 确保脚本抛出遇到的错误
set -e
npm run build

cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:hfut-xyc/hfut-xyc.github.io.git master:html

cd -