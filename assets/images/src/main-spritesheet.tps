<?xml version="1.0" encoding="UTF-8"?>
<data version="1.0">
    <struct type="Settings">
        <key>fileFormatVersion</key>
        <int>6</int>
        <key>texturePackerVersion</key>
        <string>7.0.1</string>
        <key>autoSDSettings</key>
        <array>
            <struct type="AutoSDSettings">
                <key>scale</key>
                <double>1</double>
                <key>extension</key>
                <string></string>
                <key>spriteFilter</key>
                <string></string>
                <key>acceptFractionalValues</key>
                <false/>
                <key>maxTextureSize</key>
                <QSize>
                    <key>width</key>
                    <int>-1</int>
                    <key>height</key>
                    <int>-1</int>
                </QSize>
            </struct>
        </array>
        <key>allowRotation</key>
        <false/>
        <key>shapeDebug</key>
        <false/>
        <key>dpi</key>
        <uint>72</uint>
        <key>dataFormat</key>
        <string>json-array</string>
        <key>textureFileName</key>
        <filename></filename>
        <key>flipPVR</key>
        <false/>
        <key>pvrQualityLevel</key>
        <uint>3</uint>
        <key>astcQualityLevel</key>
        <uint>2</uint>
        <key>basisUniversalQualityLevel</key>
        <uint>2</uint>
        <key>etc1QualityLevel</key>
        <uint>70</uint>
        <key>etc2QualityLevel</key>
        <uint>70</uint>
        <key>dxtCompressionMode</key>
        <enum type="SettingsBase::DxtCompressionMode">DXT_PERCEPTUAL</enum>
        <key>ditherType</key>
        <enum type="SettingsBase::DitherType">NearestNeighbour</enum>
        <key>backgroundColor</key>
        <uint>0</uint>
        <key>libGdx</key>
        <struct type="LibGDX">
            <key>filtering</key>
            <struct type="LibGDXFiltering">
                <key>x</key>
                <enum type="LibGDXFiltering::Filtering">Linear</enum>
                <key>y</key>
                <enum type="LibGDXFiltering::Filtering">Linear</enum>
            </struct>
        </struct>
        <key>shapePadding</key>
        <uint>0</uint>
        <key>jpgQuality</key>
        <uint>80</uint>
        <key>pngOptimizationLevel</key>
        <uint>1</uint>
        <key>webpQualityLevel</key>
        <uint>101</uint>
        <key>textureSubPath</key>
        <string></string>
        <key>textureFormat</key>
        <enum type="SettingsBase::TextureFormat">png</enum>
        <key>borderPadding</key>
        <uint>0</uint>
        <key>maxTextureSize</key>
        <QSize>
            <key>width</key>
            <int>16384</int>
            <key>height</key>
            <int>16384</int>
        </QSize>
        <key>fixedTextureSize</key>
        <QSize>
            <key>width</key>
            <int>-1</int>
            <key>height</key>
            <int>-1</int>
        </QSize>
        <key>algorithmSettings</key>
        <struct type="AlgorithmSettings">
            <key>algorithm</key>
            <enum type="AlgorithmSettings::AlgorithmId">MaxRects</enum>
            <key>freeSizeMode</key>
            <enum type="AlgorithmSettings::AlgorithmFreeSizeMode">Best</enum>
            <key>sizeConstraints</key>
            <enum type="AlgorithmSettings::SizeConstraints">AnySize</enum>
            <key>forceSquared</key>
            <false/>
            <key>maxRects</key>
            <struct type="AlgorithmMaxRectsSettings">
                <key>heuristic</key>
                <enum type="AlgorithmMaxRectsSettings::Heuristic">Best</enum>
            </struct>
            <key>basic</key>
            <struct type="AlgorithmBasicSettings">
                <key>sortBy</key>
                <enum type="AlgorithmBasicSettings::SortBy">Best</enum>
                <key>order</key>
                <enum type="AlgorithmBasicSettings::Order">Ascending</enum>
            </struct>
            <key>polygon</key>
            <struct type="AlgorithmPolygonSettings">
                <key>alignToGrid</key>
                <uint>1</uint>
            </struct>
        </struct>
        <key>dataFileNames</key>
        <map type="GFileNameMap">
            <key>data</key>
            <struct type="DataFile">
                <key>name</key>
                <filename>../sprite-sheet-{n}.json</filename>
            </struct>
        </map>
        <key>multiPackMode</key>
        <enum type="SettingsBase::MultiPackMode">MultiPackManual</enum>
        <key>forceIdenticalLayout</key>
        <false/>
        <key>outputFormat</key>
        <enum type="SettingsBase::OutputFormat">RGBA8888</enum>
        <key>alphaHandling</key>
        <enum type="SettingsBase::AlphaHandling">ClearTransparentPixels</enum>
        <key>contentProtection</key>
        <struct type="ContentProtection">
            <key>key</key>
            <string></string>
        </struct>
        <key>autoAliasEnabled</key>
        <false/>
        <key>trimSpriteNames</key>
        <false/>
        <key>prependSmartFolderName</key>
        <false/>
        <key>autodetectAnimations</key>
        <true/>
        <key>globalSpriteSettings</key>
        <struct type="SpriteSettings">
            <key>scale</key>
            <double>1</double>
            <key>scaleMode</key>
            <enum type="ScaleMode">Smooth</enum>
            <key>extrude</key>
            <uint>1</uint>
            <key>trimThreshold</key>
            <uint>1</uint>
            <key>trimMargin</key>
            <uint>1</uint>
            <key>trimMode</key>
            <enum type="SpriteSettings::TrimMode">Trim</enum>
            <key>tracerTolerance</key>
            <int>200</int>
            <key>heuristicMask</key>
            <false/>
            <key>defaultPivotPoint</key>
            <point_f>0.5,0.5</point_f>
            <key>writePivotPoints</key>
            <true/>
        </struct>
        <key>individualSpriteSettings</key>
        <map type="IndividualSpriteSettingsMap">
            <key type="filename">enemies/enemy-cargoship.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>118,58,235,115</rect>
                <key>scale9Paddings</key>
                <rect>118,58,235,115</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-carrier.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>99,66,199,131</rect>
                <key>scale9Paddings</key>
                <rect>99,66,199,131</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-drone-1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>34,72,68,143</rect>
                <key>scale9Paddings</key>
                <rect>34,72,68,143</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-drone-2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>60,100,119,199</rect>
                <key>scale9Paddings</key>
                <rect>60,100,119,199</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-drone-3.png</key>
            <key type="filename">enemies/enemy-drone-4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>45,84,91,168</rect>
                <key>scale9Paddings</key>
                <rect>45,84,91,168</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-heavy-fighter-1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>99,37,199,75</rect>
                <key>scale9Paddings</key>
                <rect>99,37,199,75</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-heavy-fighter-2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>120,87,239,174</rect>
                <key>scale9Paddings</key>
                <rect>120,87,239,174</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-light-figther-1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>34,46,69,91</rect>
                <key>scale9Paddings</key>
                <rect>34,46,69,91</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-light-figther-2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>37,62,73,124</rect>
                <key>scale9Paddings</key>
                <rect>37,62,73,124</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-light-figther-3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>43,73,87,145</rect>
                <key>scale9Paddings</key>
                <rect>43,73,87,145</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-light-figther-4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>41,54,81,108</rect>
                <key>scale9Paddings</key>
                <rect>41,54,81,108</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">enemies/enemy-scout.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>64,29,128,58</rect>
                <key>scale9Paddings</key>
                <rect>64,29,128,58</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">engine-exhaust/blue/frame-01.png</key>
            <key type="filename">engine-exhaust/blue/frame-02.png</key>
            <key type="filename">engine-exhaust/blue/frame-03.png</key>
            <key type="filename">engine-exhaust/blue/frame-04.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.71875,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>22,32,43,64</rect>
                <key>scale9Paddings</key>
                <rect>22,32,43,64</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">engine-exhaust/red/frame-01.png</key>
            <key type="filename">engine-exhaust/red/frame-02.png</key>
            <key type="filename">engine-exhaust/red/frame-03.png</key>
            <key type="filename">engine-exhaust/red/frame-04.png</key>
            <key type="filename">engine-exhaust/red/frame-05.png</key>
            <key type="filename">engine-exhaust/red/frame-06.png</key>
            <key type="filename">engine-exhaust/red/frame-07.png</key>
            <key type="filename">engine-exhaust/red/frame-08.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.8125,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>9,16,17,32</rect>
                <key>scale9Paddings</key>
                <rect>9,16,17,32</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">engine-exhaust/yellow/frame-01.png</key>
            <key type="filename">engine-exhaust/yellow/frame-02.png</key>
            <key type="filename">engine-exhaust/yellow/frame-03.png</key>
            <key type="filename">engine-exhaust/yellow/frame-04.png</key>
            <key type="filename">engine-exhaust/yellow/frame-05.png</key>
            <key type="filename">engine-exhaust/yellow/frame-06.png</key>
            <key type="filename">engine-exhaust/yellow/frame-07.png</key>
            <key type="filename">engine-exhaust/yellow/frame-08.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.945055,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>7,23,14,45</rect>
                <key>scale9Paddings</key>
                <rect>7,23,14,45</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">player/main-ship.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.47625,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>200,85,400,169</rect>
                <key>scale9Paddings</key>
                <rect>200,85,400,169</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">player/turret-main-aft.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.706349,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>17,32,35,63</rect>
                <key>scale9Paddings</key>
                <rect>17,32,35,63</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">player/turret-main-forward.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.66129,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>21,31,42,62</rect>
                <key>scale9Paddings</key>
                <rect>21,31,42,62</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">player/turret-point-defense.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.669355,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>20,31,41,62</rect>
                <key>scale9Paddings</key>
                <rect>20,31,41,62</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">projectiles/missile.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>14,25,28,51</rect>
                <key>scale9Paddings</key>
                <rect>14,25,28,51</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">projectiles/projectile.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.178082</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>5,18,10,37</rect>
                <key>scale9Paddings</key>
                <rect>5,18,10,37</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
        </map>
        <key>fileLists</key>
        <map type="SpriteSheetMap">
            <key>enemies</key>
            <struct type="SpriteSheet">
                <key>files</key>
                <array>
                    <filename>enemies</filename>
                </array>
            </struct>
            <key>misc</key>
            <struct type="SpriteSheet">
                <key>files</key>
                <array>
                    <filename>engine-exhaust</filename>
                    <filename>projectiles</filename>
                </array>
            </struct>
            <key>player</key>
            <struct type="SpriteSheet">
                <key>files</key>
                <array>
                    <filename>player</filename>
                </array>
            </struct>
        </map>
        <key>ignoreFileList</key>
        <array/>
        <key>replaceList</key>
        <array/>
        <key>ignoredWarnings</key>
        <array/>
        <key>commonDivisorX</key>
        <uint>1</uint>
        <key>commonDivisorY</key>
        <uint>1</uint>
        <key>packNormalMaps</key>
        <false/>
        <key>autodetectNormalMaps</key>
        <true/>
        <key>normalMapFilter</key>
        <string></string>
        <key>normalMapSuffix</key>
        <string></string>
        <key>normalMapSheetFileName</key>
        <filename></filename>
        <key>exporterProperties</key>
        <map type="ExporterProperties"/>
    </struct>
</data>
