%% Analisi delle eigenfaces
dataset = dataset_read('.\dataset\train',224,224);
dataset = double(dataset);

media = mean(dataset,2); % 1
A(:,:) = dataset-repmat(media,1,size(dataset,2));
[U,lambda] = eigen_training(A); % 2,3,4

% Visualizzo le prime 30 eigenfaces
figure;
for i = 1:30
    subplot(5,6,i); imagesc(reshape(U(:,i),[r,c]));
    colormap gray; axis image; axis off; title(num2str(i)); colorbar;
end

% Visualizzo le ultime 30 eigenfaces
figure;
for i = 1:30
    subplot(5,6,i); imagesc(reshape(U(:,size(dataset,2)-i),[r,c]));
    colormap gray; axis image; axis off; title(num2str(size(dataset,2)-i)); colorbar;
end

% Informazione catturata in funzione del numero di autovalori
figure;
subplot(211);
plot(lambda); title('Eigenvalues');
subplot(212);
y = cumsum(lambda)/sum(lambda);
plot(y); title('Modelled Information');

%% Lettura e salvataggio dei dataset per le fasi successive
clear all; close all;
r = 224; c = 224;

train_matrix = dataset_read('.\dataset\train',r,c);
save('train.mat', 'train_matrix');
validation_matrix = dataset_read('.\dataset\validation',r,c);
save('validation.mat', 'validation_matrix');
test_matrix = dataset_read('.\dataset\test',r,c);
save('test.mat', 'test_matrix');
