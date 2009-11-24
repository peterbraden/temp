

# ====== Maths ======

class Vec3(object):

	__slots__ = ('x', 'y', 'z')

	
	def __init__(self, x, y, z):
		self.x = x
		self.y = y
		self.z = z
   
	def __eq__(self, other):
		if isinstance(other, Point5D):
			return self.x == other.x and self.y == other.y and self.z == other.z
		return NotImplemented	
		
	def __ne__(self, other):
		result = self.__eq__(other)
		if result is NotImplemented:
			return result
		return not result

	def __str__(self):
		return "<%s, %s, %s>" % (str(self.x),  str(self.y), str(self.z))
	
	def __repr__(self):
		return "Vec3(%s, %s, %s)" % (self.x, self.y, self.z)
	
	
	def __add__(self, other):
		if isinstance(other, Point3D):
			return Point3D(self.x + other.x, self.y +other.y, self.z + other.z)
		return NotImplemented
		
	def __sub__(self, other):
		if isinstance(other, Point3D):
			return Point3D(self.x - other.x, self.y - other.y, self.z - other.z)
		return NotImplemented
	
	def __mul__(self, other):
		if isinstance(other, Number):
			return Point3D(self.x*other, self.y*other, self.z*other)
		if isinstance(other, Point3D):
			return (self.x*other.x + self.y*other.y + self.z*other.z);
		if isinstance(other, Matrix3):
			return Matrix((self.x,self.y,self.z)) * other	
		return NotImplemented	
	
	def __getitem__(self,index):
		if index == 0:
			return self.x
		if index == 1:
			return self.y
		if index == 2:
			return self.z
		raise TypeError("Index out of bounds for Point3D (x is 0, y is 1, z is 2)")
		
	@property
	def length(self):
		return math.sqrt(self.x*self.x + self.y*self.y + self.z*self.z)

	def normalised(self):
		return Point3D(self.x/self.length, self.y/self.length, self.z/self.length);
		
	def translated(self, other): 
		return self + other
	   
	def dot_product(self, c):
		return self * c
	
	def cross_product(self, b):
		xh = self.y * b.z - b.y * self.z
		yh = self.z * b.x - b.z * self.x
		zh = self.x * b.y - b.x * self.y
		return Point5D(xh,yh,zh)


# ====== Primitives ======

class Sphere(object):
	__slots__ = ('pos', 'radius')
	
	def __init__(self, pos, radius):
		self.pos = pos
		self.radius = radius

	def intersects(self, ro, rd):
		rdn = rd.normalised()
		dst = ro - self.pos
		b = dst.dot_product(rdn)
		c = dst.dot_product(dst) - this.radius * this.radius
		d = b*b-c
		if d:
			return -b - sqrt(d)
		return False

	def normal(self, r):
		return (pt - this.pos).normalised()


# ====== Raytracer ======

def intersection(ro, rd, max, min):
	'''
	Determine whether the ray from ro->rd intersects an object and if
	so, return the nearest distance and object
	'''

	min = min or 0
	nearest = None
	nearest_dist = max

	for obj in scene:
		d = obj.intersects(ro, rd)
		if d and d < nearest_dist > min :
			nearest_dist = d
			nearest = obj
	
	return (nearest_dist, nearest)


def trace(ro, rd, depth=0):
	'''
	Trace a ray ro->rd through the scene
	'''
	
	dist, nearest =  intersection(ro, rd, 1.0E1000000)

	if nearest:
		intersection_point = ro + (rd.normalised() * dist)
		normal = nearest.normal(intersection_point)

		#ambient


if __name__ == "__main__":
	scene = [Sphere(Vec3(0,0,2), 5)]



