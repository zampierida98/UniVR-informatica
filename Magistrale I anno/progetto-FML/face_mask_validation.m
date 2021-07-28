%% Face mask validation
clear all;
close all;

load('train.mat', 'train_matrix');
train_matrix = double(train_matrix);
Mt = size(train_matrix,2);
train_label = reshape(repmat([1 2],Mt/2,1),Mt,1); % 2 classi da 800 immagini ciascuna

load('validation.mat', 'validation_matrix');
validation_matrix = double(validation_matrix);
Mv = size(validation_matrix,2);
validation_label = reshape(repmat([1 2],Mv/2,1),Mv,1); % 2 classi da 400 immagini ciascuna

%%
% Algoritmo eigenfaces
media = mean(train_matrix,2);
A = train_matrix-repmat(media,1,Mt);
[U,lambda] = eigen_training(A);

acc_i = 1;
for passo = 1:15 % Considero varie dimensioni dell'intervallo (massimo 15)
    for j = 0:29 % Mi limito a 30 eigenfaces
        T_ind = 1+j:passo+j;
        omega_train = U(:,T_ind)'*A; % Proiezione del train set in uno spazio T dimensionale
        omega_validation = U(:,T_ind)'*(validation_matrix-repmat(media,1,Mv)); % Proiezione del validation set

        validation_i = 0;
        num_neigh = 5; % Numero di vicini per l'algoritmo KNN
        for i = 1:Mv
            validation_i = validation_i + 1;
            class = knnclassify(omega_validation(:,i)',omega_train',train_label,num_neigh);
            accuracy(validation_i) = class==validation_label(i);
        end

        fprintf('%i:%i accuracy = %f\n',1+j,passo+j,sum(accuracy)/size(accuracy,2));
        acc(acc_i) = sum(accuracy)/size(accuracy,2);
        acc_i = acc_i + 1;
    end
end

fprintf('%f\n',max(acc)); % Accuratezza più alta
