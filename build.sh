timestamp=`date +%s`

echo 'build conference'
cp src/wfc/av/internal/engine-conference.min.js src/wfc/av/internal/engine.min.js
npm run build
cp dist/voip-dist.html voip-conference-${timestamp}.html

echo 'build multi'
timestamp=`date +%s`
cp src/wfc/av/internal/engine-multi.min.js src/wfc/av/internal/engine.min.js
npm run build
cp dist/voip-dist.html voip-multi-${timestamp}.html

