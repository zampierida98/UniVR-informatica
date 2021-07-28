function [U,lambda] = eigen_training(A)
% Prende in input la matrice A risultante dalla sottrazione
% della media da ogni immagine presente.
% Applica l'algoritmo per le eigenfaces ma, a differenza di
% PCA, calcola la matrice di covarianza come A'A (invece di AA').
% Restituisce gli M autovalori di A'A (ovvero gli M autovalori
% più grandi di AA') e gli M autovettori più grandi di AA'
% calcolando AV.

M = size(A,2);
L = A'*A;

[V,valori] = eig(L);
valori = diag(valori);

[lambda,ind] = sort(valori,'descend');
V = V(:,ind);

U = A*V;

% Per avere vettori di norma 1 
for i=1:M
    U(:,i) = U(:,i)/norm(U(:,i));
end
