import json

def parse_sections(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        sections_data = file.read().split('@')
        sections = []
        count = 31
        for section in sections_data:
            if not section.strip():
                continue  # Skip empty sections
            lines = section.strip().split('\n')
            date = lines[0].strip()
            title = lines[1].strip()
            content = [line.strip() for line in lines[2:]]
            sections.append({
                'date': date,
                'title': title,
                'content': content,
                'id': count,
                'era': 4
            })
            count += 1
    return sections

def write_json(sections, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(sections, file, ensure_ascii=False, indent=2)

def main():
    input_file = 's4_esp.txt'  # Change this to your input file path
    output_file = 'section4.json'  # Change this to your desired output file path
    sections = parse_sections(input_file)
    write_json(sections, output_file)
    print(f'JSON file has been created at {output_file}')

if __name__ == "__main__":
    main()
