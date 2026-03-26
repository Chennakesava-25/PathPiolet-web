import os
for root, dirs, files in os.walk('.'):
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
    if '.git' in dirs:
        dirs.remove('.git')
    for f in files:
        if f.endswith(('.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx', '.json', '.css')):
            path = os.path.join(root, f)
            try:
                with open(path, 'rb') as file:
                    if file.read(3) == b'\xef\xbb\xbf':
                        print(f"Found BOM in: {path}")
            except Exception as e:
                pass
