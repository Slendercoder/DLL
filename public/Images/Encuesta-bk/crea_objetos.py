#-*-coding: utf-8-*-

print "loading packages..."
import numpy as np
from random import randint, choice
import matplotlib.pyplot as plt
import matplotlib.patches as patches
print "Ready!"

def dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, id):

    if paridadVerticales:
        numVerticales = 2 * randint(3,6) + 1
    else:
        numVerticales = 2 * randint(3,6)

    print u"Número de líneas verticales: ", numVerticales

    if paridadHorizontales:
        numHorizontales = 2 * randint(3,6) + 1
    else:
        numHorizontales = 2 * randint(3,6)

    print u"Número de líneas horizontales: ", numHorizontales

    fig4, axes4 = plt.subplots()
    axes4.get_xaxis().set_visible(False)
    axes4.get_yaxis().set_visible(False)

    tangulos = []
    if colorRayas:
        colorRaya = "blue"
    else:
        colorRaya = "red"

    tileColor = colorRaya

    if tipoPoligono:
        tangulos.append(patches.Rectangle(*[(0, 0), 1, 1],\
                                    facecolor="black", alpha=0.3))

    step = 1. / (2 * numVerticales)

    raya = True
    for j in range(0, 2 * numVerticales - 1):
        by_x = j * step
        print "by_x: " + str(by_x)
        if raya:
            raya = False
            tangulos.append(patches.Rectangle(*[(step/2 + by_x, 0), step, 1],\
                facecolor=tileColor))
        else:
            raya = True


    step = 1. / (2 * numHorizontales)

    raya = True
    for j in range(0, 2 * numHorizontales - 1):
        by_y = j * step
        print "by_y: " + str(by_y)
        if raya:
            tangulos.append(patches.Rectangle(*[(0, step/2 + by_y), 1, step],\
                facecolor=tileColor))
            raya = False
        else:
            raya = True

    for t in tangulos:
        axes4.add_patch(t)

    fig4.savefig("objeto_encuesta" + str(id) + ".png")


# Xol:
# tipoPoligono = False # Fondo blanco
# colorRayas = False # Rojo
# paridadVerticales = True # impar
# paridadHorizontales = False # par
#
# Dup:
tipoPoligono = True # Fondo gris
colorRayas = True # Azul
paridadVerticales = False # par
paridadHorizontales = False # par
#

# True: Fondo gris; False: Fondo blanco
# tipoPoligono = choice([False, True])
# tipoPoligono = False

# True: Azul; False: Rojo
# colorRayas = choice([False, True])
# colorRayas = True

# True: Impar; False: Par
# paridadVerticales = choice([False, True])
# paridadVerticales = False

# True: Impar; False: Par
# paridadHorizontales = choice([False, True])
# paridadHorizontales = True

numObjetosInicial = 23
numObjetosFinal = 24

for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)
