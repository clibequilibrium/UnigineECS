mkdir %USERPROFILE%\bake\src
cd %USERPROFILE%\bake\src

IF NOT EXIST "bake" (
    echo "Cloning bake repository..."
    git clone -q "https://github.com/SanderMertens/bake"
    cd "bake"
) else (
    cd "bake"
    echo "Reset bake repository..."
    git fetch -q origin
    git reset -q --hard origin/master
    git clean -q -xdf
)


cd build-Windows\
nmake /f bake.mak


bake.exe setup --local


