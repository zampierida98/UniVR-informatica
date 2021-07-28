# -*- coding: utf-8 -*-
import os
import scipy.io
import numpy as np
import numpy.linalg


def eigen_training(A):
    '''
    Applica l'algoritmo per le eigenfaces sulla matrice A ma, a differenza di
    PCA, calcola la matrice di covarianza come A'A (invece di AA').

    Parameters
    ----------
    A : numpy.ndarray
        Matrice risultante dalla sottrazione della media da ogni oggetto del dataset.

    Returns
    -------
    U : numpy.ndarray
        Gli M autovettori più grandi di AA'.
    valori : numpy.ndarray
        Gli M autovalori di A'A (ovvero gli M autovalori più grandi di AA').

    '''
    
    M = A.shape[1]
    L = np.dot(A.T, A)
    
    valori, V = np.linalg.eig(L)
    
    ind = np.argsort(valori)
    valori = np.sort(valori)
    ind = ind[::-1]
    valori = valori[::-1]
    
    V = V[:,ind]
    V = -1 * V
    
    U = A @ V
    
    # Per avere vettori di norma 1
    for i in range(0,M):
        U[:,i] = U[:,i] / np.linalg.norm(U[:,i])

    return U, valori


def knnclassify(test,train,label,K):
    '''
    Dato un oggetto test e definito un valore intero positivo
    e non nullo K, si cercano i K oggetti più vicini a test
    nello spazio delle features rappresentato da train.

    Parameters
    ----------
    test : numpy.ndarray
        Vettore che rappresenta una particolare proiezione del test set.
    train : numpy.ndarray
        Matrice che rappresenta la proiezione del train set.
    label : numpy.ndarray
        Vettore delle etichette (classi) degli oggetti del train set.
    K : int
        Numero di vicini da ricercare.

    Returns
    -------
    classe : int
        La classe che si presenta maggiormente tra i K oggetti selezionati.

    '''
    
    num_c = train.shape[0]
    
    repe = np.tile(test, (num_c,1))
    dist = np.sqrt(np.sum((repe-train)**2, 1))
    
    ind = np.argsort(dist)
    
    label_ind = label[ind]
    
    label_ind = label_ind[0:K]
    
    num_classi = int(max(label))
    win = []
    for i in range(0,num_classi):
        win.append(sum(label_ind == float(i+1)))
        
    return np.argmax(win) + 1


if __name__ == '__main__':
	print("Caricamento del train set e del test set... ", end="")
	train_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'train.mat')
	test_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'test.mat')

	train_matrix = scipy.io.loadmat(train_path)
	test_matrix = scipy.io.loadmat(test_path)

	train_matrix = train_matrix['train_matrix']
	test_matrix = test_matrix['test_matrix']

	train_matrix = np.array(train_matrix)
	test_matrix = np.array(test_matrix)

	train_matrix = train_matrix.astype(np.float64)
	test_matrix = test_matrix.astype(np.float64)

	M = train_matrix.shape[1]
	Mt = test_matrix.shape[1]

	train_label = np.ones(M)
	train_label[M//2:] = train_label[M//2:] * 2

	test_label = np.ones(Mt)
	test_label[483:] = test_label[483:] * 2
	print("completato")

	# Algoritmo eigenfaces
	print("Applicazione dell'algoritmo eigenfaces e proiezione... ", end="")
	media = np.mean(train_matrix, 1)
	rep_media = np.tile(media, (M,1))
	rep_media = rep_media.swapaxes(0, 1)
	A = train_matrix - rep_media
	U, _ = eigen_training(A)

	# Proiezioni nello spazio T dimensionale
	a = 4
	b = 14
	T_ind = [i for i in range(a-1,b)]
	omega_train = U[:,T_ind].T @ A # Proiezione del train set

	rep_media_test = np.tile(media, (Mt,1))
	rep_media_test = rep_media_test.swapaxes(0, 1)
	B = test_matrix - rep_media_test
	omega_test = U[:,T_ind].T @ B # Proiezione del test set
	print("completato")

	# Algoritmo KNN
	confmat = np.zeros((2,2)) # Matrice di confusione
	num_neigh = 5 # Numero di vicini
	for i in range(0,Mt):
		classe = knnclassify(omega_test[:,i].T,omega_train.T,train_label,num_neigh)
		r = int(test_label[i]) - 1
		c = classe - 1
		confmat[r,c] = confmat[r,c] + 1

	# Misure di accuratezza
	print("\nMisure di accuratezza della classificazione:")
	print('TPR = {:.6f}'.format(confmat[0,0]/(confmat[0,0]+confmat[0,1])))
	print('TNR = {:.6f}'.format(confmat[1,1]/(confmat[1,1]+confmat[1,0])))
	print('FPR = {:.6f}'.format(confmat[1,0]/(confmat[1,0]+confmat[1,1])))
	print('FNR = {:.6f}'.format(confmat[0,1]/(confmat[0,1]+confmat[0,0])))
	print('Precisione = {:.6f}'.format(confmat[0,0]/(confmat[0,0]+confmat[1,0])))
	print('Accuratezza = {:.6f}'.format((confmat[0,0]+confmat[1,1])/sum(sum(confmat))))
