export interface sourceInterface {
    name: string
};

export interface allDataInterface {
    data: mapInterface[]
}

export interface mapInterface {
    id: string,
    position: {
        center: number[],
        essential: boolean,
        zoom: number,
        pitch?: number,
        bearing?: number
    },
    defaultColor?: string,
    parts: mapPartInterface[]
}

export interface langInterface {
    en: string,
    pt: string
}

export interface mapPartInterface {
    source: {
        type: string,
        caption?: langInterface,
        properties: {
            color?: string,
            bgColor?: string,
            lineWidth?: number,
            is3d?: boolean,
            size?: number,
            backgroundOpacity?: number,
            place_name?: string,
            name?: string
        },
        geometry: {
            coordinates: number[][],
            type: string
        }
    }
}

export interface mapLayerInterface {
    id: string,
    source: string,
    type: string,
    paint: {
        "line-color"?: string,
        "line-width"?: number,
        "circle-radius"?: number,
        "circle-color"?: string,
        "fill-opacity"?: number,
        "fill-color"?: string,
        "circle-stroke-color"?: string,
        "circle-stroke-width"?: number
    }
}

const lineColor : (defaultColor: string | undefined) => string = (defaultColor) => {
    if (defaultColor)
        return defaultColor;
    return '#f44b9a';
}

const backgroundColor : (defaultColor: string | undefined) => string = (defaultColor) => {
    if (defaultColor)
        return defaultColor;
    return '#444bca';
}

const default_circle_radius = 5;
const default_background_opacity = 0.5;
const default_stroke_color = "#000000";
const default_stroke_width = 2;

export function createLayer(part : mapPartInterface, index : number, id : string, defaultColor: string | undefined) : mapLayerInterface {
    var layer : mapLayerInterface = {
        type: "",
        id: `${id}-${index}`,
        source: `${id}-${index}`,
        paint: {}
    };

    // Drawing a line
    if (part.source.geometry.type === 'LineString') {
        layer.type = 'line';

        if (part.source.properties.color)
            layer.paint["line-color"] = part.source.properties.color;
        else
            layer.paint["line-color"] = lineColor(defaultColor);


        if (part.source.properties.lineWidth)
            layer.paint["line-width"] = part.source.properties.lineWidth;
        else
            layer.paint["line-width"] = 2;
    }

    else if (part.source.geometry.type === 'MultiPoint') {
        layer.type = "circle";

        if (part.source.properties.bgColor)
            layer.paint["fill-color"] = part.source.properties.bgColor;
        else
            layer.paint["fill-color"] = backgroundColor(defaultColor);

        if (part.source.properties.backgroundOpacity)
            layer.paint["fill-opacity"] = part.source.properties.backgroundOpacity;
        else
            layer.paint["fill-opacity"] = default_background_opacity;
    }

    // Drawing a polygon
    else if (part.source.geometry.type === 'Polygon' && !part.source.properties.is3d) {
        layer.type = 'fill';

        if (part.source.properties.bgColor)
            layer.paint["fill-color"] = part.source.properties.bgColor;
        else
            layer.paint["fill-color"] = backgroundColor(defaultColor);

        if (part.source.properties.backgroundOpacity)
            layer.paint["fill-opacity"] = part.source.properties.backgroundOpacity;
        else
            layer.paint["fill-opacity"] = default_background_opacity;
    }

    // Drawing a point
    else if (part.source.geometry.type === 'Point') {
        layer.type = 'circle';

        if (part.source.properties.size)
            layer.paint['circle-radius'] = part.source.properties.size;
        else
            layer.paint['circle-radius'] = default_circle_radius;

        if (part.source.properties.bgColor)
            layer.paint['circle-color'] = part.source.properties.bgColor;
        else
            layer.paint['circle-color'] = backgroundColor(defaultColor);

        layer.paint['circle-stroke-color'] = default_stroke_color;
        layer.paint['circle-stroke-width'] = default_stroke_width;

    }

    return layer;
}

export function generateBounds(coordinates : any) {
    let bounds = {
        'coordinates': [[0,0],[0,0]],
        'position': [0,0]
    }

    let N = coordinates[0][1], S = coordinates[0][1], W = coordinates[0][0], E = coordinates[0][0];

    coordinates.forEach((c : any) => {

        if (c[1] > N)
            N = c[1];
        if (c[1] < S)
            S = c[1];
        if (c[0] > E)
            E = c[0];
        if (c[0] < W)
            W = c[0];
    })

    N += Math.abs(N - S) * 0.15;
    S -= Math.abs(N - S) * 0.15;
    W -= Math.abs(W - E) * 0.15;
    E += Math.abs(W - E) * 0.15;


    bounds.coordinates = [[W, S], [E, N]];

    bounds.position[0] = (W + E) / 2;
    bounds.position[1] = (N + S) / 2;

    return bounds;
}

export const easingFunctions = {
    // start slow and gradually increase speed
    easeInCubic: function (t : any) {
    return t * t * t;
    },
    // start fast with a long, slow wind-down
    easeOutQuint: function (t : any) {
    return 1 - Math.pow(1 - t, 5);
    },
    // slow start and finish with fast middle
    easeInOutCirc: function (t : any) {
    return t < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    },
    // fast start with a "bounce" at the end
    easeOutBounce: function (t : any) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
    return n1 * t * t;
    } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
    }
};

export interface legendInterface {
    layers: string[],
    colors: string[]
}

export function generateLegends(section : mapInterface, lang : string) {
    let legend : legendInterface = {
        layers : [],
        colors : []
    };

    if (lang === 'es') {
        lang = 'en';
    }

    section.parts.map((part, partIndex) => {
        if (part.source.caption) {
            let caption = part.source.caption as any;
            if (caption[lang] && legend.layers.indexOf(caption[lang]) == -1) {
                legend.layers.push(caption[lang]);

                let color = lineColor('');

                if (part.source.properties.color)
                    color = part.source.properties.color;
                else if (part.source.properties.bgColor)
                    color = part.source.properties.bgColor;

                legend.colors.push(color);
            }
        } else if (part.source.properties.name) {
            legend.layers.push(part.source.properties.name);

            let color = lineColor('');

            if (part.source.properties.color)
                color = part.source.properties.color;
            else if (part.source.properties.bgColor)
                color = part.source.properties.bgColor;

            legend.colors.push(color);
        }
    })

    return legend;
}