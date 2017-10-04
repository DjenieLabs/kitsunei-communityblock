=======================================
cookiecutter-kitsunei-community-block
=======================================

A cookiecutter_ template for kitsunei Community Blocks.

.. _cookiecutter: https://github.com/audreyr/cookiecutter


Install
-------

Requirements::

* Python: It's already installed in MAC and Linux machines
* pip: https://pip.pypa.io/en/stable/installing/
* Virtualenv: http://docs.python-guide.org/en/latest/dev/virtualenvs/

Prepare a Python Environment::

It's possible create an environment for multiple community blocks, this isolated environment will keep all python dependencies for creating blocks.

    .. code-block:: bash

        $ cd my_workspace
        $ virtualenv myblocks-env
        $ source myblocks-env/bin/activate
        $ pip install cookiecutter

Use the following command for deactivate your virtual env 

    .. code-block:: bash

        $ deactivate


Get started::

Active your environment

    .. code-block:: bash

        $ cd my_workspace
        $ source myblocks-env/bin/activate 


Create a new community block

    .. code-block:: bash

        $ cookiecutter https://github.com/DjenieLabs/kitsunei-communityblock
    

You'll be prompted for some questions, answer them, then it will create an empty kitsunei community block for you.

This example is creating an EmailSender Block

    .. code-block:: bash

        Cloning into 'kitsunei-communityblock'...
        ...
        block_name (default is "kitsunei-BlockName")? kitsunei-EmailSender
        block_shortname: (default is "EmailSender")? EmailSender
        author_name (default is "Your Name")? Roger Camargo
        email (default is "Your email")? your@email.com
        description (default is "A short description of the project.")? An email sender
        version (default is "0.1.0")? 


The 'kitsunei-EmailSender' has been created. You need code it, which is all around the file main.js:

    .. code-block:: bash

        $ cd kitsunei-EmailSender
        $ cat EmailSender/main.js


Check if the code is correct

    .. code-block:: bash

        $ npm install
        $ gulp


Make the block available for the IDE

    .. code-block:: bash

        $ npm run start

Publishing
-------

Before publishing your block you need to compile it and push it to your repository:

    .. code-block:: bash

        $npm run build
        $git push origin master

This will create a 'dist' folder in your root directory. You can then go to creator.kitsunei.com/block/list/hardware/ and publish a new version.

Be aware that if a 'dist' directory doesn't not exist in your repository the publishing process will fail.