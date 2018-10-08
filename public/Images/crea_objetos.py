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
        numVerticales = 2 * randint(2,4) + 1
    else:
        numVerticales = 2 * randint(2,4)

    print u"Número de líneas verticales: ", numVerticales

    if paridadHorizontales:
        numHorizontales = 2 * randint(2,4) + 1
    else:
        numHorizontales = 2 * randint(2,4)

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

    fig4.savefig("objeto" + str(id) + ".png")


# True: Fondo gris; False: Fondo blanco
# tipoPoligono = choice([False, True])
#
# True: Azul; False: Rojo
# colorRayas = choice([False, True])
#
# True: Impar; False: Par
# paridadVerticales = choice([False, True])
#
# True: Impar; False: Par
# paridadHorizontales = choice([False, True])

# Creo los XOL, que tienen rayas rojas y una cantidad impar de rayas verticales
colorRayas = False # Rayas de color rojo
tipoPoligono = False # Fondo blanco
paridadVerticales = True # Impar
paridadHorizontales = True # Impar
numObjetosInicial = 1
numObjetosFinal = 4
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

tipoPoligono = True # Fondo gris
numObjetosInicial = 5
numObjetosFinal = 5
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

tipoPoligono = False # Fondo blanco
paridadHorizontales = False # Par
numObjetosInicial = 6
numObjetosFinal = 6
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

# Creo los distractores
colorRayas = False # Rayas de color rojo
tipoPoligono = True # Fondo gris
paridadVerticales = False # Par
paridadHorizontales = True # Impar
numObjetosInicial = 7
numObjetosFinal = 7
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

colorRayas = False # Rayas de color rojo
tipoPoligono = False # Fondo blanco
numObjetosInicial = 8
numObjetosFinal = 8
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

colorRayas = True # Rayas de color azul
tipoPoligono = False # Fondo blanco
numObjetosInicial = 9
numObjetosFinal = 9
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

tipoPoligono = True # Fondo gris
numObjetosInicial = 10
numObjetosFinal = 10
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

# Creo los DUP, que tienen fondo gris y una cantidad par de rayas horizontales
colorRayas = True # Rayas de color azul
tipoPoligono = True # Fondo gris
paridadVerticales = True # Impar
paridadHorizontales = False # Par
numObjetosInicial = 11
numObjetosFinal = 14
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

paridadVerticales = False # Par
numObjetosInicial = 15
numObjetosFinal = 15
#
for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)

colorRayas = False # Rayas de color rojo
paridadVerticales = True # Impar
numObjetosInicial = 16
numObjetosFinal = 16

for cont in range(numObjetosInicial, numObjetosFinal + 1):
    dibuja_objeto(tipoPoligono, \
                  paridadHorizontales, \
                  paridadVerticales, \
                  colorRayas, cont)
