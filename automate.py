# -*- coding: utf-8 -*-
import json

# Define the colors for lines
line_colors = [
    "#354a64", "#88643c", "#3c8864", "#643c88", "#4c883c", "#88763c",
    "#3c8888", "#883c4c", "#3c4c88", "#8c3c88", "#8c3c4c", "#8c8c3c",
    "#3c8c8c", "#d15536", "#36d155"
]

# Define the colors for points
point_colors = [
    "#0cff8e",  # Color 1
    "#0ce7ff",  # Color 2
    "#d169f7"   # Color 3
]



memory = {}
area_memory = {}

def process_feature(feature, color_index):
    global memory
    """Process a single feature to format it according to the requirements."""
    geometry_type = feature['geometry']['type']
    properties = feature['properties']

    source = {
        "type": feature['type'],
        "properties": feature['properties'],
        "geometry": feature['geometry']
    }

    # Handle Point features
    if geometry_type == "Point":
        if properties.get('name') and memory.get(properties['name']):
            source["properties"]["bgColor"] = memory[properties['name']]["bgColor"]
        else:
            source["properties"]["bgColor"] = point_colors[color_index % len(point_colors)]
        source["properties"]["mapbox_id"] = properties.get("mapbox_id", "")
        source["properties"]["place_name"] = properties.get("place_name", "").split(",")[0]

    # Handle LineString features
    elif geometry_type == "LineString":
        source["properties"]["lineWidth"] = 3

        if properties.get('name'):
            if memory.get(properties['name']):
                source["properties"]["color"] = memory[properties['name']]["color"]
            else:
                source["properties"]["color"] = line_colors[color_index % len(line_colors)]

        #source["properties"]["color"] = "#ede554"
    elif geometry_type == "Polygon":
        source["properties"]["bgColor"] = line_colors[color_index % len(line_colors)]

    # Add other properties that were not mentioned

    # Add caption if name or place_name is present
    caption = {}
    pt = "wrfwr"
    if 'name' in properties:
        caption['en'] = properties['name']
        pt = properties['name']

        # if bgColor
        bgColor = ''
        color = ''
        if source['properties'].get('bgColor'):
            bgColor = source['properties']['bgColor']
        if source['properties'].get('color'):
            color = source['properties']['color']

        memory[properties['name']] = {
            "bgColor": bgColor,
            "color": color
        }

    if 'caption_en' in properties:
        caption['en'] = properties['caption_en']
    elif 'place_name' in properties:
        caption['en'] = properties['place_name']

    if caption and geometry_type != "Point":
        caption['pt'] = pt
        source["caption"] = caption

    # if attribute "Area" is in properties, add caption with the area
    if 'name' in properties or 'israel_annexation' in properties or 'palestine_annexation' in properties:
        if 'israel_annexation' in properties:
            properties['name'] = 'israel_annexation'
        elif 'palestine_annexation' in properties:
            properties['name'] = 'palestine_annexation'
        else:
            en_caption = properties['name']
            pt_caption = properties['name']

        if 'israel_annexation' in properties:
            en_caption = 'Area to be annexed to Israel'
            pt_caption = 'Área a ser anexada a Israel'
        elif 'palestine_annexation' in properties:
            en_caption = 'Area to be annexed to Palestine'
            pt_caption = 'Área a ser anexada a Palestina'

        source["caption"] = {
            "en": en_caption,
            "pt": pt_caption
        }

        if properties["name"] in area_memory:
            source["properties"]["bgColor"] = area_memory[properties["name"]]
        else:
            area_memory[properties["name"]] = line_colors[color_index % len(line_colors)]
            source["properties"]["bgColor"] = area_memory[properties["name"]]

    return {"source": source}

def process_features(input_filename, output_filename):
    """Read features from a file, process them, and write the output to another file."""
    with open(input_filename, 'r') as infile:
        data = json.load(infile)

    if not isinstance(data, list):
        print("Error: Input data is not a list of features.")
        return

    parts = []
    color_index = 0
    for feature in data:
        parts.append(process_feature(feature, color_index))
        color_index += 1

    with open(output_filename, 'w') as outfile:
        json.dump(parts, outfile, indent=2)

# Example usage
input_filename = '/Users/nicolasfuchs/Desktop/All/Personal/JudeaHistory/judea-history/input.json'  # Adjust with your input file path
output_filename = 'output.json'  # Adjust with your desired output file path

# Uncomment the line below to run the function with your filenames
process_features(input_filename, output_filename)
