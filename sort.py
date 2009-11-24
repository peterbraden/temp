'''
One of the most common tasks in computer science, and
therefore one of the most important family of algorithms
is sorting an unordered list.

Since we'll be swapping elements frequently, let's start by
defining a function to swap elements i and j in a list

'''
def swap(list, i, j):
	temp = elements[j]
	elements[j] = elements[i]
	elements[i] = temp
	

'''
Let's start by looking at some less-efficient but simple
sorting algorithms.
'''

def bubble_sort(elements):
	'''
	One of the most intuitive search algorithms is bubble-
	sort. Although woefully inneficient, and therefore not
	a practical sorting algorithm, due to it's simplicity
	it's often used to introduce sorting algorithms.
	
	While we could do this sort on the original list, let's
	make a copy of the list so we don't affect the original.
	'''
	elements = elements[:]

	'''
	We start by setting a loop, that we will stay in until
	the list is sorted.
	'''
	swaps_occurred = False
	while not swaps_occurred:
		'''
		Now we iterate through the list, at each index 
		taking 2 elements and switching them in order.
		'''
		for i in range(len(elements)-2):
			if elements[i] > elements[i+1]:
				swap(elements, i, i+1)
				'''
				And indicate a swap has ocurred
				'''
				swaps_occurred = True
	
	'''
	Once there are no more swaps left to complete, we 
	know that the list is in order and can leave.
	'''
	return elements

'''
The reason this sort is so inefficient is that it has a
doubly nested loop, each up to n-steps long, where n is 
the number of elements in the list.

Thus this algorithm is of the order of n*n.

We can do a lot better.
'''

def insertion_sort(elements):
	elements = elements[:]

	for i in range(len(elements)):
		val = elements[i]
		while val >
		

if __name__ == "__main__":
	test_data = [2,6,3,7,4,1,5,8,0,9]

	print "Bubble Sort:",  bubble_sort(test_data)

