function dataset = dataset_read(directory,r,c)
% Carica immagini di persone con e senza mascherina presenti nelle
% sotto-directory 'with' e 'without' della directory passata in input.
% r e c sono le dimensioni in pixel con cui vengono uniformate tutte le immagini.
% Restituisce una matrice di dimensione (r*c)x(M1+M2).

list_w = dir(strcat(directory,'\with\*.png'));
list_wo = dir(strcat(directory,'\without\*.png'));

M1 = size(list_w,1);
M2 = size(list_wo,1);

dataset = zeros(r*c,M1+M2);

for i = 1:M1
    original = imread(strcat(directory,'\with\',list_w(i).name));
    resized = imresize(original,[r c]);
    final = rgb2gray(resized);
    dataset(:,i)= final(:);
end

for i = 1:M2
    original = imread(strcat(directory,'\without\',list_wo(i).name));
    resized = imresize(original,[r c]);
    final = rgb2gray(resized);
    dataset(:,M1+i)= final(:);
end

end
