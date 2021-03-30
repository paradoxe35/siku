IF EXIST "public\dev" (
 npm run dev
) ELSE (
 npm run assets-link && npm run dev 
)