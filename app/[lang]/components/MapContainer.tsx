"use client"

import React, { useContext, useState } from 'react'
import { Context } from '../context/SectionContext';
import { NavHeight } from './Navbar2';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import type {CircleLayer, FillLayer, HeatmapLayer, LineLayer} from 'react-map-gl';
import { FeatureCollection, Polygon } from 'geojson';

const parkLayer: FillLayer = {
  id: 'abraham',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3FC8',

  }
};

export default function MapContainer() {
  const { section, setState } = useContext(Context);
  const [style, setStyle] = useState("mapbox://styles/theo-fuchs/clo4rifqc00op01r23r5u8l1l");
  const [zoom, setZoom] = useState(3.5);

  function onClick(e : any) {
    setZoom(zoom + 1);
    // setStyle(map);
  }

  const geojsonn: any = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
    ]
  };

  const geojson: any = {
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.442378,
            30.653504
          ],
          "type": "Point"
        },
        "id": "0fa06b328123ed6305627697f0f7d5cd"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.364506,
            30.431345
          ],
          "type": "Point"
        },
        "id": "108fd8ff8a43f0e3f8de34d2f693137f"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.63844,
            29.51584
          ],
          "type": "Point"
        },
        "id": "11a88982da7631a1b10d12a8504534f6"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            32.539186,
            30.004011
          ],
          "type": "Point"
        },
        "id": "15cbc7925ad3ab789a93cd4bc315026d"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            35.037779,
            29.931131
          ],
          "type": "Point"
        },
        "id": "22d156f4e3aef347568d157dfe4ed614"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            33.756209,
            28.633766
          ],
          "type": "Point"
        },
        "id": "22fd6d5f0c7cce95282ba4bdf46c27b4"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.501621,
            29.288284
          ],
          "type": "Point"
        },
        "id": "346f859ecb9a18b1e514b15826bc4a43"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            35.460753,
            30.65571
          ],
          "type": "Point"
        },
        "id": "35f1e80e670760817b196564577c55c8"
      },
      {
        "type": "Feature",
        "properties": {
          "R": "dXJuOm1ieHBsYzpBa0xLUXc",
          "wikidata": "Q2097405",
          "place_name": "Qanteer, Fakous, Al Sharqia, Egypt"
        },
        "geometry": {
          "coordinates": [
            [
              31.867185,
              30.798691
            ],
            [
              31.980198,
              30.016582
            ],
            [
              32.539273,
              30.003034
            ],
            [
              32.483405,
              29.850709
            ]
          ],
          "type": "MultiPoint"
        },
        "id": "59ea86e5c278102914ce2e02f5ecefa2"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.65148,
            30.015231
          ],
          "type": "Point"
        },
        "id": "5ae9adcc266617592b7e60ca86c91cde"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.661391,
            30.061358
          ],
          "type": "Point"
        },
        "id": "60785dfbc9be38a94d52844b0e1d0d2f"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpLQ2k1",
          "wikidata": "Q5687",
          "place_name": "Jericho, Jericho Governorate, Palestinian Territories"
        },
        "geometry": {
          "coordinates": [
            35.459885,
            31.855991
          ],
          "type": "Point"
        },
        "id": "6ab15be20d4bf24ae60304780c62eba6"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              31.866278,
              30.794532
            ],
            [
              31.849998,
              30.591155
            ],
            [
              31.854185,
              30.389535
            ],
            [
              31.891121,
              30.187023
            ],
            [
              31.923916,
              30.0893
            ],
            [
              31.977178,
              29.998661
            ],
            [
              32.038981,
              29.977301
            ],
            [
              32.113724,
              29.972128
            ],
            [
              32.258456,
              29.977504
            ],
            [
              32.394891,
              29.994614
            ],
            [
              32.465984,
              30.001923
            ],
            [
              32.53564,
              29.991802
            ],
            [
              32.483048,
              29.957106
            ],
            [
              32.444534,
              29.919798
            ],
            [
              32.442722,
              29.866361
            ],
            [
              32.484151,
              29.837337
            ],
            [
              32.579208,
              29.837337
            ],
            [
              32.674265,
              29.837337
            ],
            [
              32.697375,
              29.830418
            ],
            [
              32.708932,
              29.80596
            ],
            [
              32.729159,
              29.769572
            ],
            [
              32.749394,
              29.674214
            ],
            [
              32.833188,
              29.489679
            ],
            [
              32.921314,
              29.350998
            ],
            [
              33.026769,
              29.255105
            ],
            [
              33.111285,
              29.177544
            ],
            [
              33.224684,
              29.122675
            ],
            [
              33.317865,
              29.080422
            ],
            [
              33.445704,
              29.043218
            ],
            [
              33.500861,
              29.020938
            ],
            [
              33.544465,
              28.98098
            ],
            [
              33.58835,
              28.89348
            ],
            [
              33.598779,
              28.822439
            ],
            [
              33.632315,
              28.751398
            ],
            [
              33.681735,
              28.677819
            ],
            [
              33.751373,
              28.621975
            ],
            [
              34.032588,
              28.600511
            ],
            [
              34.191309,
              28.781755
            ],
            [
              34.39926,
              28.994147
            ],
            [
              34.416589,
              29.131622
            ],
            [
              34.497459,
              29.27162
            ],
            [
              34.642078,
              29.498743
            ],
            [
              34.59408,
              29.639177
            ],
            [
              34.570284,
              29.791432
            ],
            [
              34.596727,
              29.896134
            ],
            [
              34.615999,
              29.947175
            ],
            [
              34.653422,
              29.999525
            ],
            [
              34.514646,
              30.093909
            ],
            [
              34.391061,
              30.209319
            ],
            [
              34.28115,
              30.339164
            ],
            [
              34.210737,
              30.492606
            ],
            [
              34.224028,
              30.544547
            ],
            [
              34.237034,
              30.568464
            ],
            [
              34.265943,
              30.597857
            ],
            [
              34.343321,
              30.624184
            ],
            [
              34.443759,
              30.640246
            ],
            [
              34.492163,
              30.580854
            ],
            [
              34.540567,
              30.521462
            ],
            [
              34.59431,
              30.376711
            ],
            [
              34.667347,
              30.057444
            ],
            [
              35.025485,
              29.91237
            ],
            [
              34.950391,
              29.546246
            ],
            [
              34.865409,
              29.652106
            ],
            [
              34.780427,
              29.757966
            ],
            [
              34.704853,
              29.880167
            ],
            [
              34.66315,
              30.015419
            ],
            [
              34.524928,
              30.254084
            ],
            [
              34.338091,
              30.466504
            ],
            [
              34.37275,
              30.426671
            ],
            [
              34.587151,
              30.567797
            ],
            [
              34.827237,
              30.669659
            ],
            [
              35.094243,
              30.745273
            ],
            [
              35.370627,
              30.797162
            ],
            [
              35.367886,
              30.744967
            ],
            [
              35.390701,
              30.698263
            ],
            [
              35.418759,
              30.663478
            ],
            [
              35.463443,
              30.641629
            ],
            [
              35.527676,
              30.665441
            ],
            [
              35.569369,
              30.7067
            ],
            [
              35.611062,
              30.748924
            ],
            [
              35.639232,
              30.795021
            ],
            [
              35.751891,
              30.963064
            ],
            [
              35.755188,
              30.966686
            ],
            [
              35.864798,
              31.093958
            ],
            [
              35.885575,
              31.164294
            ],
            [
              35.871723,
              31.219815
            ],
            [
              35.826488,
              31.264246
            ],
            [
              35.815883,
              31.330872
            ],
            [
              35.803329,
              31.460414
            ],
            [
              35.80875,
              31.607107
            ],
            [
              35.796841,
              31.72178
            ],
            [
              35.734567,
              31.793818
            ],
            [
              35.634745,
              31.831489
            ],
            [
              35.547921,
              31.850757
            ],
            [
              35.461097,
              31.857759
            ]
          ],
          "type": "LineString"
        },
        "id": "6fbf53df3e4259cddfa463cac3a57d1a"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            33.581583,
            28.90397
          ],
          "type": "Point"
        },
        "id": "71640f7014944106944448f735264498"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            33.027508,
            29.261451
          ],
          "type": "Point"
        },
        "id": "80b8ee920ccec960610e3ae64ad5117e"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            35.750185,
            30.980753
          ],
          "type": "Point"
        },
        "id": "8315c1000b6539f7bfe71094623a1980"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.195126,
            28.797391
          ],
          "type": "Point"
        },
        "id": "84d74b93e506c81f8fed59d0267a5a2e"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            35.794712,
            31.477328
          ],
          "type": "Point"
        },
        "id": "96661be725449bbf5a43157ba9734497"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            33.447874,
            29.053581
          ],
          "type": "Point"
        },
        "id": "9689cb869f85b52e40fd4560c8136f5b"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.039175,
            28.617389
          ],
          "type": "Point"
        },
        "id": "bff4c7201a87201a079107375944b9ce"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.330438,
            30.477496
          ],
          "type": "Point"
        },
        "id": "c302dade04ed9e1e7b7e25a7a040b18d"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpIT2hw",
          "place_name": "Eilat, Southern District, Israel"
        },
        "geometry": {
          "coordinates": [
            34.949795,
            29.556935
          ],
          "type": "Point"
        },
        "id": "daa30c3dfcdf8761e7bd34986720bd95"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.568903,
            29.807006
          ],
          "type": "Point"
        },
        "id": "e7654d0e11e98d3eb027618bb82b2842"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            35.366131,
            30.804028
          ],
          "type": "Point"
        },
        "id": "f3819a45a4eee8e2f3b80101cae5cda5"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            34.406574,
            29.004282
          ],
          "type": "Point"
        },
        "id": "fd6e14d8ed3eddda3c5e2f30a29e7725"
      }
    ],
    "type": "FeatureCollection"
  }

  const geojson1: any = {
    "features": [
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpBa1J0",
          "wikidata": "Q59202",
          "short_code": "IQ-BB",
          "place_name": "Babylon, Iraq"
        },
        "geometry": {
          "coordinates": [
            44.432813,
            32.482245
          ],
          "type": "Point"
        },
        "id": "05818e1115c38aa47ef3f84380e91106"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpSTmM",
          "wikidata": "Q2007044",
          "short_code": "SY-DI",
          "place_name": "Damascus, Syria"
        },
        "geometry": {
          "coordinates": [
            36.309581,
            33.513069
          ],
          "type": "Point"
        },
        "id": "058ae99a90ec9244b9fd5c268471c724"
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            [
              46.176389,
              30.911398
            ],
            [
              44.392175,
              32.525395
            ],
            [
              40.852069,
              34.601892
            ],
            [
              39.024485,
              36.931665
            ],
            [
              37.126988,
              36.203804
            ],
            [
              36.305683,
              33.48486
            ],
            [
              35.229491,
              32.200023
            ],
            [
              35.20117,
              31.695372
            ],
            [
              35.087887,
              31.52654
            ],
            [
              34.86132,
              31.260617
            ],
            [
              31.262222,
              29.854203
            ]
          ],
          "type": "LineString"
        },
        "id": "08414936ec47d708e040b2af0bfd86f2"
      },
      {
        "type": "Feature",
        "properties": {
          "place_name": "Memphis"
        },
        "geometry": {
          "coordinates": [
            31.261637,
            29.8542
          ],
          "type": "Point"
        },
        "id": "1b7719ea4926a4de4671cbf3b12550af"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpBU2VJYlE",
          "place_name": "Ur"
        },
        "geometry": {
          "coordinates": [
            46.127777,
            30.956111
          ],
          "type": "Point"
        },
        "id": "47856b88ac7419d6dec822d3d44c371e"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpEd2hw",
          "wikidata": "Q41843",
          "place_name": "Beer Sheva"
        },
        "geometry": {
          "coordinates": [
            34.792518,
            31.245744
          ],
          "type": "Point"
        },
        "id": "81cd73d54332886adabccb790e58377d"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpJNmk1",
          "place_name": "Hebron"
        },
        "geometry": {
          "coordinates": [
            35.094487,
            31.528902
          ],
          "type": "Point"
        },
        "id": "a3568cf76dda7bb84ef69478c9c49534"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpOeWhw",
          "wikidata": "Q1218",
          "place_name": "Jerusalem, Jerusalem District, Israel"
        },
        "geometry": {
          "coordinates": [
            35.18679,
            31.773315
          ],
          "type": "Point"
        },
        "id": "a6943db06d07df9cfc24dd2030099b66"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpaTmM",
          "wikidata": "Q214064",
          "short_code": "SY-HL",
          "place_name": "Aleppo, Syria"
        },
        "geometry": {
          "coordinates": [
            37.163725,
            36.19924
          ],
          "type": "Point"
        },
        "id": "c83c6f122e9aa8f89a0a7a706ddbac9a"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpSZ2pr",
          "wikidata": "Q199547",
          "place_name": "Haran"
        },
        "geometry": {
          "coordinates": [
            39.025136,
            36.871006
          ],
          "type": "Point"
        },
        "id": "cdcf543825819b09c6e0d4d40ff59870"
      },
      {
        "type": "Feature",
        "properties": {
          "place_name": "Mari"
        },
        "geometry": {
          "coordinates": [
            40.888607,
            34.549961
          ],
          "type": "Point"
        },
        "id": "d263b87c7503feca031024751e47b8df"
      },
      {
        "type": "Feature",
        "properties": {
          "mapbox_id": "dXJuOm1ieHBsYzpOQWk1",
          "wikidata": "Q214178",
          "place_name": "Nablus (Schem)"
        },
        "geometry": {
          "coordinates": [
            35.256937,
            32.220532
          ],
          "type": "Point"
        },
        "id": "ed15330fada8445172514439e78ef095"
      }
    ],
    "type": "FeatureCollection"
  }

  const slaveryInEgypt: any = {
    "features": [
      {
        "type": "Feature",
        "properties": {
          "Name": "Mitanni Empire"
        },
        "geometry": {
          "coordinates": [
            [
              [
                37.053969,
                36.83385
              ],
              [
                37.139828,
                36.477975
              ],
              [
                37.254307,
                36.097337
              ],
              [
                37.841011,
                35.842548
              ],
              [
                38.442024,
                35.761307
              ],
              [
                39.400784,
                35.796135
              ],
              [
                40.159206,
                35.645104
              ],
              [
                40.545572,
                35.33051
              ],
              [
                40.923437,
                35.709884
              ],
              [
                40.898917,
                36.10709
              ],
              [
                40.947957,
                36.462867
              ],
              [
                40.580152,
                36.69915
              ],
              [
                40.065224,
                37.091344
              ],
              [
                39.84454,
                37.384165
              ],
              [
                39.280572,
                37.675847
              ],
              [
                38.814685,
                37.985715
              ],
              [
                37.784829,
                37.578746
              ],
              [
                37.490584,
                37.30619
              ],
              [
                37.392503,
                37.091344
              ],
              [
                37.22086,
                36.954305
              ],
              [
                37.053969,
                36.83385
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": "115024ad2d5f16d67c2f6779c26ff1eb"
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "Egyptian Empire"
        },
        "geometry": {
          "coordinates": [
            [
              [
                29.284836,
                30.829636
              ],
              [
                30.033564,
                31.236779
              ],
              [
                30.436725,
                31.482683
              ],
              [
                31.171054,
                31.617656
              ],
              [
                31.675005,
                31.494962
              ],
              [
                32.063767,
                31.445839
              ],
              [
                32.45253,
                31.199838
              ],
              [
                32.740502,
                31.101258
              ],
              [
                33.443339,
                30.998242
              ],
              [
                34.093015,
                31.248513
              ],
              [
                34.580271,
                31.581178
              ],
              [
                34.807657,
                32.050427
              ],
              [
                35.035044,
                32.818079
              ],
              [
                35.26243,
                33.443735
              ],
              [
                35.554784,
                34.011075
              ],
              [
                35.663719,
                34.343042
              ],
              [
                35.979649,
                34.553146
              ],
              [
                35.867545,
                34.838037
              ],
              [
                35.899197,
                35.305424
              ],
              [
                35.706263,
                35.619711
              ],
              [
                36.064569,
                36.033131
              ],
              [
                36.602029,
                35.865788
              ],
              [
                36.505562,
                35.282928
              ],
              [
                36.478,
                34.888237
              ],
              [
                36.670934,
                34.446195
              ],
              [
                36.355639,
                33.501088
              ],
              [
                36.509929,
                32.898607
              ],
              [
                36.392375,
                32.55867
              ],
              [
                36.671565,
                32.34788
              ],
              [
                36.462961,
                31.940007
              ],
              [
                36.442407,
                31.485394
              ],
              [
                36.257421,
                31.081386
              ],
              [
                36.288252,
                30.878734
              ],
              [
                36.113543,
                30.666813
              ],
              [
                36.031327,
                30.223818
              ],
              [
                35.784679,
                29.841239
              ],
              [
                35.527754,
                29.635998
              ],
              [
                35.22972,
                29.591325
              ],
              [
                35.013903,
                29.555573
              ],
              [
                34.993349,
                29.39453
              ],
              [
                34.973525,
                29.565651
              ],
              [
                34.751201,
                29.311528
              ],
              [
                34.681725,
                28.874414
              ],
              [
                34.612249,
                28.728298
              ],
              [
                34.528877,
                28.545365
              ],
              [
                34.445506,
                28.276489
              ],
              [
                34.473296,
                28.080514
              ],
              [
                34.40382,
                27.908743
              ],
              [
                34.362134,
                27.712099
              ],
              [
                34.098124,
                27.724399
              ],
              [
                33.695162,
                28.006932
              ],
              [
                33.584,
                28.252011
              ],
              [
                33.250514,
                28.484317
              ],
              [
                33.194933,
                28.898746
              ],
              [
                33.014295,
                29.093203
              ],
              [
                32.73639,
                29.34787
              ],
              [
                32.666914,
                29.613984
              ],
              [
                32.680809,
                29.770904
              ],
              [
                32.611333,
                29.90349
              ],
              [
                32.486275,
                29.807081
              ],
              [
                32.389009,
                29.58982
              ],
              [
                32.555752,
                29.44472
              ],
              [
                32.708599,
                29.05677
              ],
              [
                32.680809,
                28.935235
              ],
              [
                32.889238,
                28.655163
              ],
              [
                33.014295,
                28.484317
              ],
              [
                33.171282,
                27.521816
              ],
              [
                33.293727,
                26.438481
              ],
              [
                33.329441,
                25.493341
              ],
              [
                33.550806,
                24.438141
              ],
              [
                33.663192,
                23.616968
              ],
              [
                32.820296,
                23.642709
              ],
              [
                32.567427,
                23.745621
              ],
              [
                32.286461,
                24.079524
              ],
              [
                31.949303,
                24.079524
              ],
              [
                31.80882,
                24.412559
              ],
              [
                31.527855,
                25.228587
              ],
              [
                31.303082,
                25.88761
              ],
              [
                30.797345,
                26.44239
              ],
              [
                30.26351,
                26.768968
              ],
              [
                29.757773,
                26.91938
              ],
              [
                29.673483,
                27.792773
              ],
              [
                29.368983,
                28.466133
              ],
              [
                29.234948,
                28.975489
              ],
              [
                29.503017,
                29.404536
              ],
              [
                29.68173,
                29.793013
              ],
              [
                29.614713,
                30.392181
              ],
              [
                29.284836,
                30.829636
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": "d6f0d9f3906c4ffba5e2c95f15bbdfaa"
      }
    ],
    "type": "FeatureCollection"
  }

  const linejson: any = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "coordinates": [
        [31.866278, 30.794532],
        [31.849998, 30.591155],
        [31.854185, 30.389535],
        [31.891121, 30.187023],
        [31.923916, 30.0893],
        [31.977178, 29.998661],
        [32.038981, 29.977301],
        [32.113724, 29.972128],
        [32.258456, 29.977504],
        [32.394891, 29.994614],
        [32.465984, 30.001923],
        [32.53564, 29.991802],
        [32.483048, 29.957106],
        [32.444534, 29.919798],
        [32.442722, 29.866361],
        [32.484151, 29.837337],
        [32.579208, 29.837337],
        [32.674265, 29.837337],
        [32.697375, 29.830418],
        [32.708932, 29.80596],
        [32.729159, 29.769572],
        [32.749394, 29.674214],
        [32.833188, 29.489679],
        [32.921314, 29.350998],
        [33.026769, 29.255105],
        [33.111285, 29.177544],
        [33.224684, 29.122675],
        [33.317865, 29.080422],
        [33.445704, 29.043218],
        [33.500861, 29.020938],
        [33.544465, 28.98098],
        [33.58835, 28.89348],
        [33.598779, 28.822439],
        [33.632315, 28.751398],
        [33.681735, 28.677819],
        [33.751373, 28.621975],
        [34.032588, 28.600511],
        [34.191309, 28.781755],
        [34.39926, 28.994147],
        [34.416589, 29.131622],
        [34.497459, 29.27162],
        [34.642078, 29.498743],
        [34.59408, 29.639177],
        [34.570284, 29.791432],
        [34.596727, 29.896134],
        [34.615999, 29.947175],
        [34.653422, 29.999525],
        [34.514646, 30.093909],
        [34.391061, 30.209319],
        [34.28115, 30.339164],
        [34.210737, 30.492606],
        [34.224028, 30.544547],
        [34.237034, 30.568464],
        [34.265943, 30.597857],
        [34.343321, 30.624184],
        [34.443759, 30.640246],
        [34.492163, 30.580854],
        [34.540567, 30.521462],
        [34.59431, 30.376711],
        [34.667347, 30.057444],
        [35.025485, 29.91237],
        [34.950391, 29.546246],
        [34.865409, 29.652106],
        [34.780427, 29.757966],
        [34.704853, 29.880167],
        [34.66315, 30.015419],
        [34.524928, 30.254084],
        [34.338091, 30.466504],
        [34.37275, 30.426671],
        [34.587151, 30.567797],
        [34.827237, 30.669659],
        [35.094243, 30.745273],
        [35.370627, 30.797162],
        [35.367886, 30.744967],
        [35.390701, 30.698263],
        [35.418759, 30.663478],
        [35.463443, 30.641629],
        [35.527676, 30.665441],
        [35.569369, 30.7067],
        [35.611062, 30.748924],
        [35.639232, 30.795021],
        [35.751891, 30.963064],
        [35.755188, 30.966686],
        [35.864798, 31.093958],
        [35.885575, 31.164294],
        [35.871723, 31.219815],
        [35.826488, 31.264246],
        [35.815883, 31.330872],
        [35.803329, 31.460414],
        [35.80875, 31.607107],
        [35.796841, 31.72178],
        [35.734567, 31.793818],
        [35.634745, 31.831489],
        [35.547921, 31.850757],
        [35.461097, 31.857759]
      ],
      "type": "LineString"
    }
  }

  const [currData, setCurrData] = useState(slaveryInEgypt);
  

  const layerStyle: FillLayer = {
    id: 'point',
    type: 'fill',
    paint: {
      "fill-color": "#fff"
    }
  };

  const layerStyle2: LineLayer = {
    id: 'heat',
    type: 'line',

  }
  
  const [viewState, setViewState] = useState({
    longitude: 31,
    latitude: 34,
    zoom: 3.5
  });

  const onClickFunc = (e: any) => {
    setCurrData(geojson1);
    setViewState({...viewState, zoom: viewState.zoom + 0.5})
    
  }

  return (
    <div id="map-container" className={`bg-sky-100 fixed top-20 left-0 md:right-0 md:left-auto h-screen md:w-3/5 w-screen`}>
      <ReactMapGL
        mapLib={import('mapbox-gl')}
        mapboxAccessToken="pk.eyJ1IjoidGhlby1mdWNocyIsImEiOiJjbG8xdTY2YWEwcmE1MmpxdTc2aTB5em9vIn0.5nVFaNsMgKWeqmNQQFPnxg"
        {...viewState}
        style={{width: '100%', height: '100%'}}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/theo-fuchs/clo495o1h00kz01qmb2q5dc5u"
      >
        {/* <Layer
          id="theo-fuchs.clo1vp7io02rp2hnvozwotmg8-9jwli"
          type="raster"
          source="theo-fuchs.clo1vp7io02rp2hnvozwotmg8-9jwli"
          paint={{
            'raster-opacity': 1.0,
          }}
        />
          <Layer {...parkLayer} />  */}
          <Source id="my-data" type="geojson" data={linejson}>
            <Layer {...layerStyle2} />
          </Source>
          <button onClick={onClickFunc} className='fixed left-0 z-100 bg-red-500'>click</button>
      </ReactMapGL>
    </div>
  )
}
