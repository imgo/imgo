imgo
========
Advanced images optimizer

Оптимизатор изображений

Статья \ Article
---------------------------
* Ru: [Как пользоваться Imgo](https://github.com/imgo/imgo/wiki/imgo-ru "Как пользоваться Imgo")
* En: [Imgo User Guide](https://github.com/imgo/imgo/wiki "Imgo User Guide")

Поддерживаемые форматы
---------------------------
* png
* jpeg, jpg
* gif

Использование
---------------------------
* "imgo ." если запустить программу c точкой, в качестве параметра, то она рекурсивно будет искать все файлы (*.png, *.gif, *.jpg, *.jpeg) в текущей директории и всех поддиректориях, лежащих ниже, и попытается сжать их
* "imgo file.png" в качестве атрибута поддерживается  имя сжимаемого файла
* "imgo file.png file2.gif" вместо одного файла можно указать несколько, через пробел

Об уровнях сжатия
---------------------------
Уровни сжатия imgo можно условно разделить на 3 степени (это справедливо для формата PNG):

* "imgo file.png" базовый уровень сжатия (используется по умолчанию), работает относительно быстро, применяет "безопасные" преобразования, рекомендуется использовать на файлах, которые будут открываться c помощью IE6;
* "imgo -b file.png" продвинутый уровень сжатия (вызывается параметром -b или -brute), применяется весь набор преобразований, опасен же тем, что некоторые файлы (с прозрачностью) могут некорректно отображаться в IE6;
* "imgo -m -b file.png" достигается за счет многократного сжатия файла (вызывается параметром -m или -multipass). Замечено, что при дополнительном проходе можно сжать файл сильнее, обычно счет идет на байты и доли процента.

Расширенное использование
---------------------------
* "imgo -h", "imgo --help"  - вывести справку
* "imgo -b", "imgo --brute" - перейти в режим продвинутого сжатия, опасен для IE6, сжимает лучше, но раза в 2-3 медленнее
* "imgo -png" - при рекурсивном обходе папки и ее поддиректорий обрабатывать только *.png файлы
* "imgo -jpg" - при рекурсивном обходе папки и ее поддиректорий обрабатывать только *.jpg и *.jpeg файлы
* "imgo -e", "imgo --emulate" - включение режима эмуляции, исходные файлы перезаписаны не будут, будет выведена только информация о том, насколько можно сжать файл\файлы
* "imgo -m", "imgo --multipass" - если файл удалось сжать, он будет обработан повторно, до тех пор, пока эффективность сжатия не будет равна 0
* "imgo -q", "imgo --quiet" - скрытый режим, никакой информации выведено не будет
* "imgo -V", "imgo --version" - выведет на экран версию скрипта
* "imgo -d", "imgo --diff" - после сжатия выводит на экран информацию (различия) между оригинальным файлом и сжатым (экспериментальная функция)
* "imgo -v", "imgo --log" - выводит на экран дополнительную информацию, применяется в отладочных целях

Плюшки
---------------------------
* "imgo -s", "imgo --separate" данная команда отрабатывает на файлах PNG24+Alpha, она создает дополнительно 3 файла. Первый - содержит все непрозрачные области (filename_imgcocmp_corp.png), второй - содержит все полупрозрачные области (filename_imgcocmp_alpha.png), третий - это конвертация первого файла в PNG8, с потерей качества!!! (filename_imgcocmp_corp-nq8.png). Полученные файлы можно обработать "imgo" для получения большей степени сжатия. Как применять эти файлы, можно посмотреть по адресу: http://www.artlebedev.ru/tools/technogrette/img/png-2/
* "imgo -bkgd#ffffff" устанавливает bKGD, после чего сжимает файл. Как использовать bKGD, можно узнать здесь: http://banzalik.ru/png24-ie6-bg/
* "imgo -rt" создает рядом с PNG24+Alpha файл filename_imgcocmp_rt.png, c удаленной Alpha (показывает все содержимое, скрытое за прозрачностью)
* "imgo -png8a"  конвертирует PNG24+Alpha в PNG8+Alpha (возможны потери в качестве), более подробно - зачем это надо, http://cssing.org.ua/2008/11/07/png-8-alpha/

О преобразованиях
---------------------------
Некоторые операции, позволяющие сжать файл базируются на смене типа файла, на более "подходящий" для данного (конкретного) изображения.

Преобразования для формата PNG, все преобразования не влияют на картинку (не происходит визуального изменения изображения):

* Из индексированного в полноцветное (PNG8 -> PNG24)
* Понижение количества цветов  (например PNG8 (256 цветов) -> PNG8 (20 цветов))
* tRNS в PNG+Alpha
* Изменение глубины изображения (битности на канал)
* Из Индексированного в GrayScale + Альфа
* Из Полноцветного+alpha в Полноцветное tRNS
* Полноцветный+alpha в GrayScale+alpha
* GrayScale+alpha в GrayScale tRNS
* чистка прозрачных областей (http://www.artlebedev.ru/tools/technogrette/img/png-3/)

Преобразования для формата JPG, все преобразования не влияют на картинку (не происходит визуального изменения изображения):

* включение прогрессивного режима (progressive)
* включение режима оптимизации (optimize)

Используемые библиотеки
---------------------------
* imagemagick
* pngout
* optipng
* pngrewrite
* exiftool
* advpng
* jpegtran
* gifsicle
* pngnq
* defluff
* bc

Установка в MAC OS X
---------------------------
* [Устанавливаем](https://github.com/mxcl/homebrew/wiki/Installation "Устанавливаем") homebrew, если уже установлен - переходим дальше
* Если у вас OS X Mountain Lion, тогда установите [X11](http://xquartz.macosforge.org/landing/ "X11")
* Выполняем следующие команды в терминале:

```shell
brew install exiftool imagemagick optipng libjpeg gifsicle

formulas='pngrewrite.rb pngout.rb  defluff.rb cryopng.rb imgo.rb'
for package in $formulas
do
  brew install "https://raw.github.com/imgo/imgo-tools/master/Formula/"$package
done
```
You may need to use `sudo` for brew, depending on your setup.

Установка в Linux Debian
---------------------------

Часть используемого ПО распространяется только в виде бинарных файлов, в связи с чем есть некоторые трудности с запуском на x86 (не найден defluff).

```sh
## storing current dir
pushd . > /dev/null

### Installing needed packages
sudo apt-get install advancecomp libimage-exiftool-perl imagemagick \
    optipng libjpeg-progs gifsicle pngnq \
    tar unzip libpng-dev git

### Installing additional software
mkdir /tmp/imgo-installation/bin -p
cd /tmp/imgo-installation

# messages - log for warnings
messages=/tmp/imgo-installation/messages

### I reccomend to launch commands above manually! One by one. It could be very-very sad bad because you can catch some errors. Use it at your own risk!

# pngout
wget http://static.jonof.id.au/dl/kenutils/pngout-20120530-linux-static.tar.gz -O pngout.tar.gz
if [ -e pngout.tar.gz ];
then
    tar -xvf pngout.tar.gz
    cp pngout-20120530-linux-static/`uname -m`/pngout-static ./bin/pngout
else
    echo "   * pngout not installed" >> ${messages}
fi

# defluff. WARNING! There are i686 and x86_64 binaries only
wget https://github.com/imgo/imgo-tools/raw/master/src/defluff/defluff-0.3.2-linux-`uname -m`.zip -O defluff.zip
if [ -e defluff.zip ];
then
    unzip defluff.zip
    chmod a+x defluff
    cp defluff /tmp/imgo-installation/bin
else
    echo "   * defluff not installed" >> ${messages}
fi

# cryopng
wget http://frdx.free.fr/cryopng/cryopng-linux-x86.tgz -O cryo.tgz
if [ -e cryo.tgz ];
then
    tar -zxf cryo.tgz
    cp cryo-files/cryopng /tmp/imgo-installation/bin
else
    echo "   * cryopng not installed" >> ${messages}
fi

# pngrewrite. building from sources. binaries only for win
# Do you really need pngrewrite? http://entropymine.com/jason/pngrewrite/
mkdir pngrewrite && cd pngrewrite/
wget http://entropymine.com/jason/pngrewrite/pngrewrite-1.4.0.zip -O pngrewrite.zip
if [ -e pngrewrite.zip ];
then
    unzip pngrewrite.zip
    make
    cp ./pngrewrite /tmp/imgo-installation/bin
else
    echo "   * pngrewrite not installed" >> ${messages}
fi
cd ..

# imgo script. Yeah! Finally
git clone git://github.com/imgo/imgo.git
cp imgo/imgo /tmp/imgo-installation/bin/

# copy binaries to your local ~/bin or global /usr/local/bin
# mkdir -p ~/bin && cp /tmp/imgo-installation/bin/* ~/bin # or
sudo cp /tmp/imgo-installation/bin/* /usr/local/bin/

# show warnings summary after install complete
if [ -s "${messages}" ]; then cat ${messages}; fi

# dir restore and clean up
popd > /dev/null
rm -rf /tmp/imgo-installation
```

Лицензия
---------------------------
Данное ПО распространяется по Лицензии MIT.

<!-- Yandex.Metrika counter -->
<img src="//mc.yandex.ru/watch/12831025" style="position:absolute; left:-9999px;" alt="" />
<!-- /Yandex.Metrika counter -->
