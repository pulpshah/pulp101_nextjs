import os
import datetime

def generate_tree_markdown(root_path, prefix=""):
    """
    Recursively generate a 'tree view' in Markdown format
    for the given root_path.
    """
    # We'll start with the basename of the root directory
    # as a bold, slashed entry to indicate it's a directory.
    # e.g.:  - my_folder/ 
    md = f"{prefix}- {os.path.basename(root_path)}/\n"

#Increase indentation for the children
    new_prefix = prefix + "    "

#Attempt to list all items in this directory
    try:
        items = sorted(os.listdir(root_path))
    except PermissionError:
        # If we don't have permission to read the folder,
        # just return what we have so far
        return md

    for item in items:
        item_path = os.path.join(root_path, item)
        if os.path.isdir(item_path):
            # Recursively walk subdirectories
            md += generate_tree_markdown(item_path, new_prefix)
        else:
            # Files just get a simple bullet
            md += f"{new_prefix}- {item}\n"

    return md


def create_directorymarkdown(directory="."):
    """
    Create a markdown file representing the tree structure
    of the specified directory. Default is current directory.
    """
    # Generate a timestamp for the output filename
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d%H-%M-%S")
    md_filename = f"directory{timestamp}.md"

#Build the Markdown tree
    md_content = generate_tree_markdown(os.path.abspath(directory))

#Write out to file
    with open(md_filename, "w", encoding="utf-8") as f:
        f.write(md_content)

    print(f"Created Markdown file: {md_filename}")


create_directorymarkdown()


#======= USAGE EXAMPLE =======
#Just call the function (with desired directory) in the same cell:
#create_directory_markdown(".")  # "." means current directory
