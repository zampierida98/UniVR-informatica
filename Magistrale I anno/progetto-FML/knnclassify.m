function class = knnclassify(test,train,label,K)
% Dato un oggetto test e definito un valore intero positivo
% e non nullo K, si cercano i K oggetti più vicini a test
% nello spazio delle features rappresentato da train.
% Restituisce la classe che si presenta maggiormente tra i K
% oggetti selezionati.

num_c = size(train,1);

repe = repmat(test,num_c,1);
dist = sqrt(sum((repe-train).^2,2));

[~,ind] = sort(dist,'ascend');

label_ind = label(ind);

label_ind = label_ind(1:K);

num_classi = max(label);
for i = 1:num_classi
    win(i) = sum(double(label_ind == i));
end

[~,class] = max(win);
