<?php

class Organize {

	//资源
	private static $source = [
		['id' => 'AD00002','pId' => 'AD00001','name' => '一级部门1','crumbs' => '集团1-一级部门1','isParent' => true,'open' => false,'select' => false],
		['id' => 'AD00040','pId' => 'AD00001','name' => '一级部门2','crumbs' => '集团1-一级部门2','isParent' => true,'open' => false,'select' => false],
		['id' => 'AD00048','pId' => 'AD00001','name' => '一级部门3','crumbs' => '集团1-一级部门3','isParent' => false,'open' => false,'select' => false],
		['id' => 'AD00003','pId' => 'AD00002','name' => '二级部门11','crumbs' => '集团1-一级部门1-二级部门11','isParent' => true,'open' => false,'select' => false],
		['id' => 'AD00005','pId' => 'AD00002','name' => '二级部门12','crumbs' => '集团1-一级部门1-二级部门12','isParent' => false,'open' => false,'select' => false],
		['id' => 'AD00006','pId' => 'AD00002','name' => '二级部门13','crumbs' => '集团1-一级部门1-二级部门13','isParent' => false,'open' => false,'select' => false],
		['id' => 'AD00041','pId' => 'AD00040','name' => '二级部门21','crumbs' => '集团1-一级部门2-二级部门21','isParent' => false,'open' => false,'select' => false],
		['id' => 'AD00042','pId' => 'AD00040','name' => '二级部门22','crumbs' => '集团1-一级部门2-二级部门22','isParent' => false,'open' => false,'select' => false],
		['id' => 'AD03066','pId' => 'AD00040','name' => '二级部门23','crumbs' => '集团1-一级部门2-二级部门23','isParent' => false,'open' => false,'select' => false],
		['id' =>  'AD03098','pId' =>  'AD00003','name' =>  '三级部门111','crumbs' =>  '集团1-一级部门1-二级部门11-三级部门111','isParent' => false,'open' => false,'select' =>  false],
		['id' =>  'AD03099','pId' =>  'AD00003','name' =>  '三级部门112','crumbs' =>  '集团1-一级部门1-二级部门11-三级部门112','isParent' => false,'open' =>  false,'select' =>  false],
		['id' =>  'AD03118','pId' =>  'AD00003','name' =>  '三级部门113','crumbs' =>  '集团1-一级部门1-二级部门11-三级部门113','isParent' => false,'open' =>  false,'select' =>  false
		]
	];
	public $pId;
	public $name;

	public function __construct($pid, $name) {
		$this->pId = $pid;
		$this->name = $name;
	}

	/*入口判断*/
	public function getData() {
		if($this->name) {
			$this->name = urldecode(urldecode($this->name));
			$data = $this->searchDept();
		} else {
			$data = $this->getDept();
		}

		return $data;
	}

	/*获取部门*/
	protected function getDept() {
		$data = [];
		foreach (self::$source as $value) {
			if($value['pId'] == $this->pId) {
				$data[] = $value;
			}
		}

		return $data;
	}

	/*搜索部门*/
	protected function searchDept() {
		$data = [];
		foreach (self::$source as $value) {
			if(preg_match("/{$this->name}/", $value['name'])) {
				$data[] = $value;
			}
		}

		return $data;
	}

}

$pid = isset($_POST['pId']) ? $_POST['pId'] : 0;    //父级编号
$name = isset($_POST['name']) ? $_POST['name'] : '';//名称

$model = new Organize($pid, $name);

echo json_encode($model->getData());

