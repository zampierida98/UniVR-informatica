%% Face mask testing
clear all;
close all;

load('train.mat', 'train_matrix');
train_matrix = double(train_matrix);
M = size(train_matrix,2);
train_label = reshape(repmat([1 2],M/2,1),M,1); % 2 classi da 800 immagini ciascuna

load('test.mat', 'test_matrix');
test_matrix = double(test_matrix);
Mt = size(test_matrix,2);
test_label = ones(Mt,1); % 1a classe da 483 immagini
test_label(484:end) = test_label(484:end)*2; % 2a classe da 509 immagini

%%
% Algoritmo eigenfaces
media = mean(train_matrix,2);
A = train_matrix-repmat(media,1,M);
[U,lambda] = eigen_training(A);

% Proiezioni nello spazio T dimensionale
T_ind = 4:14; % Indici degli autovettori (dalla fase di validazione)
omega_train = U(:,T_ind)'*A; % Proiezione del train set
omega_test = U(:,T_ind)'*(test_matrix-repmat(media,1,Mt)); % Proiezione del test set

confmat = zeros(2,2); % Matrice di confusione

num_neigh = 5; % Numero di vicini per il KNN
for i = 1:Mt
    class = knnclassify(omega_test(:,i)',omega_train',train_label,num_neigh);
    confmat(test_label(i),class) = confmat(test_label(i),class)+1;  
end

% Metriche statistiche
confmat
fprintf('Accuratezza = %f\n',(confmat(1,1)+confmat(2,2))/sum(confmat,'all'));
fprintf('Precisione = %f\n',confmat(1,1)/(confmat(1,1)+confmat(2,1)));
fprintf('TPR = %f\n',confmat(1,1)/(confmat(1,1)+confmat(1,2)));
fprintf('TNR = %f\n',confmat(2,2)/(confmat(2,2)+confmat(2,1)));
fprintf('FPR = %f\n',confmat(2,1)/(confmat(2,1)+confmat(2,2)));
fprintf('FNR = %f\n',confmat(1,2)/(confmat(1,2)+confmat(1,1)));
