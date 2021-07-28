# Face mask analysis
Progetto per l'esame del corso di Fondamenti di Machine Learning


## OPERAZIONI FACOLTATIVE
Scaricare il dataset da https://www.kaggle.com/ashishjangra27/face-mask-12k-images-dataset e riorganizzare le immagini secondo una struttra di directory del tipo
```
'.\dataset\[test|train|validation]\[with|without]'
```

* `dataset_read.m`

	Funzione MATLAB che carica immagini di persone con e senza mascherina (presenti nelle sotto-directory `with` e `without` di una directory passata in input) ridimensionandole e trasformandole in scala di grigi.

	Prende in input le dimensioni in pixel ($r$ e $c$) con cui vengono uniformate tutte le immagini.

	Restituisce una matrice di dimensione $(r*c) \times (M_1+M_2)$ dove $M_i$ è il numero di immagini in una delle sotto-directory.

* `eigenfaces_analysis.m`

	Script MATLAB che mostra in figura alcune eigenfaces (dopo aver fatto PCA) e traccia il grafico dell'informazione modellata.

	Si occupa inoltre di salvare su file le matrici che rappresentano le varie parti del dataset (train set, validation set, test set) opportunamente caricate tramite la funzione precedente.


## ESECUZIONE DEL PROGETTO
È possibile eseguire il progetto fin da subito utilizzando i file di dati MATLAB generati appositamente; per far girare il codice basta aprire il file `face_mask_testing.m` in MATLAB oppure eseguire il file `face_mask_testing.py` tramite l'interprete Python

* `train.mat, validation.mat, test.mat`

	File di dati MATLAB contenenti le varie parti del dataset necessarie per costruire il classificatore.

	Vengono generati a partire dalle immagini presenti in https://www.kaggle.com/ashishjangra27/face-mask-12k-images-dataset riorganizzate secondo una struttra di directory del tipo
    ```
    '.\dataset\[test|train|validation]\[with|without]'
    ```

* `eigen_training.m`

	Funzione MATLAB che prende in input una matrice $A$ e le applica l'algoritmo per le eigenfaces il quale, a differenza di PCA, calcola la matrice di covarianza come $A'A$ (invece di $AA'$).

	Restituisce gli $M$ autovalori di $A'A$ (ovvero gli $M$ autovalori più grandi di $AA'$) e gli $M$ autovettori più grandi di $AA'$.

* `knnclassify.m`

	Funzione MATLAB che dato un oggetto $test$ e definito un valore intero positivo e non nullo $K$, cerca i $K$ oggetti più vicini a $test$ nello spazio delle features rappresentato da un altro oggetto $train$.

	Restituisce la classe che si presenta maggiormente tra i $K$ oggetti selezionati.

* `face_mask_validation.m`

	Script MATLAB che si occupa della selezione delle eigenfaces più significative per un problema di face mask analysis valutando l'accuratezza risultante dall'uso di diversi insiemi di autovettori per la proiezione.

	Usa i dati del train set e del validation set.

* `face_mask_testing.m`

	Script MATLAB che realizza il sistema di riconoscimento di nuove immagini.

	Applica l'algoritmo delle eigenfaces sul train set ed esegue una proiezione in uno spazio i cui assi sono gli autovettori selezionati durante la validazione.

	Poi applica l'algoritmo delle eigenfaces ed esegue la stessa proiezione anche sul test set.

	Esegue infine la classificazione delle immagini nel test set (tramite l'algoritmo KNN) e costruisce la matrice di confusione per la valutazione delle misure di accuratezza.

* `face_mask_testing.py`

	Traduzione in Python del classificatore presente nel file precedente e delle funzioni di supporto `eigen_training` e `knnclassify`.

	Usa la libreria `numpy` per le operazioni tra matrici e la libreria `scipy` per caricare i dati del train set e del test set presenti nei file di dati MATLAB precedentemente citati.

* `Report`

	Contiene un documento che spiega scelte progettuali e conoscenze utilizzate e che presenta il flusso del codice e i risultati ottenuti.
